import React, { useState } from "react";
import TitleText from "./specSection/TitleText";
import DataForm from "./specSection/DataForm";
import { Link } from "react-router-dom";

const ForgetPage = () => {
    const titleText = "註冊";
    const description = [
        "註冊驗證碼已寄出，請至您的電子信箱查收。",
        "註冊完成，稍後將跳轉置登入頁面。"
    ];
    const dataInput = [["驗證碼"]];
    const continueBtn = ["繼續", "回到登入頁面"];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ code: ""});
    const [error, setError] = useState("");

    const inputType = [
        { type: "text"}
    ];
    
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleContinue = () => {
        if (!formData.code.trim()) {
            setError("請輸入驗證碼");
            return;
        }
        
        setError("");
        
        if (currentStep < 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="text-center">
            <TitleText 
                titleData={[titleText, description[currentStep]]}
            />
            {currentStep < 1 && (
                <DataForm
                    formData={dataInput[currentStep]}
                    inputValues={formData}
                    currentStep={currentStep}
                    onInputChange={handleInputChange}
                />
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {currentStep < 1 ? (
                <button 
                    onClick={handleContinue} 
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    {continueBtn[currentStep]}
                </button>
            ):(
                <Link 
                    to="/loginRegister"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition block text-center"
                    onClick={handleContinue}
                >
                    {continueBtn[currentStep]}
                </Link>
            )}
        </div>
    );
};

export default ForgetPage;
