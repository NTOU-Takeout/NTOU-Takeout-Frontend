// import RegisterPage from "../components/loginRegisterPage/RegisterPage";
// import ForgotPasswordPage from "../components/forgotPasswordPage/ForgotPasswordPage";
import FormPage from "../components/authPage/FormPage.jsx";
function Verify() {
    const title = "請輸入驗證碼";
    const description = "註冊驗證碼已寄出，請至您的電子信箱查收。";
    const formData = {
        "token":"驗證碼",
    };
    const continueBtnText = "提交";
    const errorMessageText = "驗證碼不符合格式";
    const handleSubmit = (payload) => {
        console.debug("Verify payload: ",payload);
    }
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] font-notoTC">
            <FormPage
                titleText={title}
                description={description}
                formData={formData}
                continiueBtnText={continueBtnText}
                errorMessageText={errorMessageText}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Verify;
