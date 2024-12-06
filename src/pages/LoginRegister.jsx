import { useState } from "react";
import StatusBar from "../components/loginRegisterPage/StatusBar";
import SubmitForm from "../components/loginRegisterPage/SubmitForm";


function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] min-h-[50vh] font-notoTC">
            <StatusBar
                status={isLogin}
                setStatus={setIsLogin}
            />
            <SubmitForm
                status={isLogin} />
        </div>
    );
}

// export default LoginRegister;
