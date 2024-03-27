const express = require("express");
const { User } = require("../db/db");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddlewere = require("./middleweres");
const { Account } = require("../db/db");
const mongoose = require("mongoose");

//signup schema of zod
const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  userName: zod.string().email(),
  password: zod.string(),
});

//signup route
router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Input",
    });
  }

  const isuser = await User.findOne({
    userName: body.userName,
  });

  if (isuser) {
    return res.status(411).json({
      message: "user already exist",
    });
  }

  const newUser = await User.create({
    userName: body.userName,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  });

  const userId = newUser._id;
  const name = newUser.firstName;

  await Account.create({
    userId,
    balance: Math.floor(1 + Math.random() * 10000),
  });

  const token = jwt.sign(
    {
      userId,
      name,
    },
    JWT_SECRET
  );

  res.json({
    message: "user created",
    token: token,
  });
});

const signinSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

//signin route
router.post("/signin", async (req, res) => {
  const body = req.body;

  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Input",
    });
  }

  const user = await User.findOne({
    userName: body.userName,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.firstName,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "user not exsist",
  });
});

//update user information schema of zod
const updateBody = zod.object({
  password: zod.string().optional(),
  lastName: zod.string().optional(),
  firstName: zod.string().optional(),
});

//user information update route
router.put("/", authMiddlewere, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "invalide Input",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "update successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || " ";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
