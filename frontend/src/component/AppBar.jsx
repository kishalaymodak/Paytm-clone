import React from "react";

function AppBar() {
  return (
    <div className=" shadow h-16 flex justify-between bg-black rounded-md ">
      <div className="flex flex-col ml-6 justify-center h-full sm:text-4xl font-sans p-4 font-bold text-white">
        Payment App
      </div>
      <div className="flex">
        <div className="flex flex-col text-white mr-4 justify-center h-full">
          Hello
        </div>
        <div className=" rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center text-xl h-full">U</div>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
