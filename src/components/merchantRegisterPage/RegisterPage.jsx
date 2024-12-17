import { useState } from "react";
import TitleText from "../specSection/TitleText";
import DataForm from "../specSection/DataForm";
import uploadImageToImgur from "../../api/image/imgurUpload";
import { Link } from "react-router-dom";

const MerchantRegisterPage = () => {
    const titleText = "註冊";
    const description = [
        "註冊驗證碼已寄出，請至您的電子信箱查收。",
        "請上傳您的商家基本資訊",
        "註冊完成，稍後將跳轉至登入頁面。"
    ];
    const dataInput = [["驗證碼"], ["上傳商家圖片", "商家電話", "商家地址"]];
    const continueBtn = ["繼續", "繼續", "回到登入頁面"];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        uploadImage: "",
        phoneNumber: "",
        address: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // 用於控制按鈕的狀態

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileChange = (field, file) => {
        setFormData({ ...formData, [field]: file });
    };

    const validateStep = () => {
        if (currentStep === 0 && !formData.code.trim()) {
            setError("請輸入驗證碼");
            return false;
        }
        if (currentStep === 1) {
            if (!formData.uploadImage) {
                setError("請上傳商家圖片");
                return false;
            }
            if (!formData.phoneNumber.trim()) {
                setError("請輸入商家電話");
                return false;
            }
            if (!formData.address.trim()) {
                setError("請輸入商家地址");
                return false;
            }
        }
        return true;
    };

    const handleContinue = async () => {
        if (!validateStep()) return;

        setError("");
        if (currentStep === 1 && formData.uploadImage) {
            // 若是上傳圖片，先上傳圖片到 Imgur
            setLoading(true); // 開始加載
            const imageUrl = await uploadImageToImgur(formData.uploadImage);
            if (imageUrl) {
                setFormData({ ...formData, uploadImage: imageUrl });
            } else {
                setError("圖片上傳失敗");
                setLoading(false);
                return;
            }
        }

        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }

        setLoading(false);
    };

    return (
        <div className="text-center">
            <TitleText titleData={[titleText, description[currentStep]]} />
            {currentStep < 2 && (
                <DataForm
                    formData={dataInput[currentStep]}
                    inputValues={formData}
                    currentStep={currentStep}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                />
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {currentStep < 2 ? (
                <button
                    onClick={handleContinue}
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                    disabled={loading} // 按鈕禁用狀態
                >
                    {loading ? "上傳中..." : continueBtn[currentStep]}
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

export default MerchantRegisterPage;
