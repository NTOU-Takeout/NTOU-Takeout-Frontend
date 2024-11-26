import CryptoJS from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import loginClient from "../../../api/auth/loginClient";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("請填寫所有欄位");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const hashedPassword = await CryptoJS.SHA256(password);
            const pPasword = hashedPassword.toString();
            const userDetails = {
                email,
                password: pPasword,
            };
            console.log("passwd login",pPasword);

            
            const response = await loginClient.loginUser(userDetails);
            console.log("登入成功:", response);

            navigate("/"); // 登入成功後導向到 dashboard
        } catch (err) {
            console.error("登入失敗:", err.message);
            setError(err.message);
        } finally {
            setIsLoading(false); // 結束加載狀態
        }
    };
    return (
        <div className="mt-8 w-[70vw]">
            <form>
                <input
                    type="email"
                    placeholder="電子信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <Link to={`/forgetPasswd`}>
                    <p className="text-sm ml-2 text-gray-600">忘記密碼？</p>
                </Link>

                {error && <p className="text-red-500 text-xs pl-2 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ) : (
                        "登入"
                    )}
                </button>
                {/* <button
                    type="submit"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] text-black py-2 rounded-lg border border-gray-600 transition"
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    使用 Google 帳號登入
                </button> */}
          </form>
      </div>
  );
};

export default LoginForm;
