import React, { useState } from "react";
import Heading from "../component/Heading";
import Subheading from "../component/Subheading";
import InpuBox from "../component/InpuBox";
import Button from "../component/Button";
import ButtomWarning from "../component/ButtomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, SetPassword] = useState("");
  return (
    <div className=" bg-slate-400 flex h-screen justify-center items-center">
      <div className=" flex flex-col justify-center ">
        <div className=" bg-white rounded-lg w-80 p-2 h-max px-4 text-center">
          <Heading lable={"Sign-IN"} />
          <Subheading lable={"Enter your credential to acess your account"} />
          <InpuBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            lable={"Email"}
            placeholder={"kishalay@gmail.com"}
          />
          <InpuBox
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
            lable={"SetPassword"}
            placeholder={"12345678"}
          />
          <div className=" pt-4">
            <Button
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    userName,
                    password,
                  }
                );
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              }}
              lable={"Sign-in"}
            />
          </div>
          <ButtomWarning
            lable={"Don't have an account ?"}
            bottomtxt={"Sing-up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
