const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddlewere = (req, res, next) => {
  const aurthorization = req.headers.authorization;
  console.log(aurthorization);
  if (!aurthorization || !aurthorization.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "aurthorization fail",
    });
  }

  jwtToken = aurthorization.split(" ")[1];
  console.log(jwtToken);
  res.jwtToken;
  try {
    const token = jwt.verify(jwtToken, JWT_SECRET);
    if (token.userId) {
      res.userId = token.userId;
      next();
    } else {
      return res.status(403).json({
        message: "Aurharisation fail",
      });
    }
  } catch (err) {
    return res.status(403).json({
      message: "Aurharisation fail",
    });
  }
};

module.exports = authMiddlewere;
