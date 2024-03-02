import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SendMony() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const name = SearchParams.get("name");
  const [amount, setamount] = useState(0);

  return (
    <div className=" flex justify-center bg-slate-500 h-screen ">
      <div className=" h-full flex flex-col justify-center">
        <div className=" border h-min max-w-md rounded-lg shadow-lg w-96 p-4 space-y-8 bg-white">
          <div className=" flex items-center flex-col p-6  ">
            <h1 className=" text-4xl font-bold text-center">Send Money</h1>
          </div>
          <div className=" p-6">
            <div className=" flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center bg-green-500 rounded-full justify-center">
                <span className=" text-2xl text-white ">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h2 className=" font-semibold text-2xl">{name.toUpperCase()}</h2>
            </div>
            <div className=" space-y-4">
              <div className=" space-y-2 mt-3">
                <label
                  htmlFor=""
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="ammount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                  type="number"
                  className=" flex border w-full rounded-md h-10 px-3 py-2 text-sm "
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => {
                  axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                }}
                type="button"
                class="focus:outline-none text-white bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  w-full"
              >
                Iniciate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMony;
