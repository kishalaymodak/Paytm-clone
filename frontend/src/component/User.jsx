import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => setUsers(res.data.user));
  }, [filter]);
  return (
    <>
      <div className=" font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search Users......"
          className=" w-full border px-2 py-1 border-slate-200 rounded"
        />
      </div>
      <div>
        {users.map((user) => (
          <Users user={user} />
        ))}
      </div>
    </>
  );
}

function Users({ user }) {
  const navigator = useNavigate();
  return (
    <div>
      <div className=" flex justify-between ">
        <div className=" flex gap-2">
          <div className=" w-12 h-12 rounded-full bg-slate-200 flex justify-center mt-1 mr-2">
            <div className=" flex justify-center flex-col text-xl h-full">
              {user.firstName[0]}
            </div>
          </div>
          <div className=" flex flex-col justify-center h-full">
            <div className=" text-2xl">
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center h-full">
          <Button
            onClick={(e) => {
              navigator(
                "/sendmoney?id=" + user._id + "&name=" + user.firstName
              );
            }}
            lable={"Send Monay"}
          />
        </div>
      </div>
    </div>
  );
}

export default User;
