import React, { useEffect, useState } from "react";
import Blance from "../component/Blance";
import AppBar from "../component/AppBar";
import User from "../component/User";
import axios from "axios";
function DashBoard() {
  const [balance, setbalance] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setbalance(res.data.balance));
  }, []);
  return (
    <div>
      <AppBar />
      <div className=" m-8">
        <Blance value={balance} />
        <User />
      </div>
    </div>
  );
}

export default DashBoard;
