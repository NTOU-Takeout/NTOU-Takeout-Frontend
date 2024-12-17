import PropTypes from "prop-types";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const SubmitForm = ({ status }) => {
    return <div className="">{status ? <LoginForm /> : <RegisterForm />}</div>;
};

SubmitForm.propTypes = {
    status: PropTypes.bool.isRequired,
};

export default SubmitForm;
