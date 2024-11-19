import React, {useState} from "react";
import RegisterPage from "../components/loginRegisterPage/RegisterPage";

function Register() {
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] min-h-[50vh] font-notoTC">
            <RegisterPage />
        </div>
    );
}

export default Register;
