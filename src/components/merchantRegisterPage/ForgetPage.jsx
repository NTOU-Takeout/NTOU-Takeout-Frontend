import { useState } from "react";
import TitleText from "./specSection/TitleText";
import DataForm from "./specSection/DataForm";
import { Link } from "react-router-dom";

const ForgetPage = () => {
    const titleText = "密碼重設";
    const description = [
        "請提供您的電子郵件以重設密碼",
        "驗證碼已寄出，請至您的電子信箱查收。",
        "請提供您的新密碼",
        "密碼重設完成，請用新密碼登入。"
    ];
    const dataInput = [["電子信箱"], ["驗證碼"], ["新密碼", "再次輸入新密碼"]];
    const continueBtn = ["寄送電子郵件驗證", "繼續", "密碼重設", "回到登入頁面"];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ email: "", code: "", newPassword: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Verify blanks
    const handleContinue = () => {
        if (currentStep === 0 && !formData.email.trim()) {
            setError("請輸入電子信箱");
            return;
        }

        if (currentStep === 1 && !formData.code.trim()) {
            setError("請輸入驗證碼");
            return;
        }

        if (currentStep === 2) {
            const { newPassword, confirmPassword } = formData;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                setError("密碼必須包含大小寫字母和數字，且長度至少為8個字符");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("兩次輸入的密碼不一致");
                return;
            }
        }

        setError("");
        if (currentStep < 3) {
            setFormData({ email: "", code: "", newPassword: "", confirmPassword: "" });
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="text-center">
            <TitleText titleData={[titleText, description[currentStep]]} />
            {currentStep < 3 && (
                <DataForm
                    formData={dataInput[currentStep]}
                    inputValues={formData}
                    currentStep={currentStep}
                    onInputChange={handleInputChange}
                />
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {currentStep < 3 ? (
                <button
                    onClick={handleContinue}
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    {continueBtn[currentStep]}
                </button>
            ) : (
                <Link
                    to="/loginRegister"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition block text-center"
                >
                    {continueBtn[currentStep]}
                </Link>
            )}
        </div>
    );
};

export default ForgetPage;
