import React from "react";
import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";

const SubmitForm = ({status}) => {

    return (
        <div className="">
            {status ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
        </div>
  );
};

export default SubmitForm;
