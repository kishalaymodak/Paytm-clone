import React from "react";

function InpuBox({ lable, placeholder, onChange }) {
  return (
    <div>
      <div className="py-2 text-sm font-medium text-left">{lable}</div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-2 py-1 border-none"
        onChange={onChange}
      />
    </div>
  );
}

export default InpuBox;
