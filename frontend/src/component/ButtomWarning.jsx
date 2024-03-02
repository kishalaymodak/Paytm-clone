import React from "react";
import { Link } from "react-router-dom";
function ButtomWarning({ lable, bottomtxt, to }) {
  return (
    <div className="py-2 flex justify-center text-sm">
      <div>{lable}</div>
      <Link className="pl-1 cursor-pointer underline  " to={to}>
        {bottomtxt}
      </Link>
    </div>
  );
}

export default ButtomWarning;
