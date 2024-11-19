import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const LoginForm = () => {

  return (
      <div className="mt-8 w-[70vw]">
          <form>
            <input
                type="email"
                placeholder="電子信箱"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
            />
            <input
                type="password"
                placeholder="密碼"
                className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
            />
            <Link to={`/forgetPasswd`}>
                <p className="text-sm ml-2 text-gray-600">忘記密碼？</p>
            </Link>
            <button
                type="submit"
                className="fixed bottom-[6rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
                登入
            </button>
            <button
                type="submit"
                className="fixed bottom-[2rem] left-[15%] w-[70%] text-black py-2 rounded-lg border border-gray-600 transition"
            >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                使用 Google 帳號登入
            </button>
          </form>
      </div>
  );
};

export default LoginForm;
