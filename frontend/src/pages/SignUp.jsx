import React, { useState } from "react";
import Heading from "../component/Heading";
import Subheading from "../component/Subheading";
import InpuBox from "../component/InpuBox";
import Button from "../component/Button";
import ButtomWarning from "../component/ButtomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className=" bg-slate-400 flex h-screen justify-center items-center">
      <div className=" flex flex-col justify-center ">
        <div className=" bg-white rounded-lg w-80 p-2 h-max px-4 text-center">
          <Heading lable={"Sign-Up"} />
          <Subheading lable={"Enter your information to open a account"} />
          <InpuBox
            lable={"First Name"}
            placeholder={"Kishalay"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InpuBox
            lable={"Last Name"}
            placeholder={"Modak"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InpuBox
            lable={"Email"}
            placeholder={"kishalay@gmail.com"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <InpuBox
            lable={"SetPassword"}
            placeholder={"12345678"}
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  userName,
                  firstName,
                  lastName,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            lable={"Sign-Up"}
          />
          <ButtomWarning
            lable={"Already have an account"}
            bottomtxt={"Sing-in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
