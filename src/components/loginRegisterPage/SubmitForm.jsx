import PropTypes from "prop-types";
import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";

const SubmitForm = ({ status }) => {
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

SubmitForm.propTypes = {
    status: PropTypes.bool.isRequired,
};

export default SubmitForm;
