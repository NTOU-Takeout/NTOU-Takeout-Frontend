import React from "react";

const StatusBar = ({status, setStatus}) => {

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-6">{status ? "登入" : "註冊"}</h1>
      <div className="border border-neutral-500 rounded-md relative flex items-center w-[70vw]">
        {/* 滑動背景 */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-orange-500 rounded-md transition-transform duration-300 ${
            status ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>

        {/* Tabs */}
        <button
          onClick={() => setStatus(true)}
          className={`z-10 w-1/2 py-2 text-center text-sm font-semibold transition-colors ${
            status ? "text-white" : "text-gray-500"
          }`}
        >
          登入
        </button>
        <button
          onClick={() => setStatus(false)}
          className={`z-10 w-1/2 py-2 text-center text-sm font-semibold transition-colors ${
            !status ? "text-white" : "text-gray-500"
          }`}
        >
          註冊
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
