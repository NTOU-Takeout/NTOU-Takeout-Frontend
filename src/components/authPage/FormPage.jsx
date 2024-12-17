import  { useState } from "react";
import PropTypes from "prop-types";
import TitleText from "../specSection/TitleText.jsx";

const FormPage = ({
    titleText,
    description,
    formData,
    continueBtnText = "繼續",
    errorMessageText,
    handleSubmit,
    isLoading,
}) => {
    const [formValues, setFormValues] = useState(
        Object.keys(formData).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {})
    );
    const [isError, setIsError] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 處理表單提交
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit?.(formValues);
    };
    console.debug("titleText", titleText);
    console.debug("descriptionText", description);
    return (
        <form onSubmit={onSubmit} className="w-full text-center h-dvh px-10">
            {titleText && (
                <TitleText
                    titleData={[titleText,description]}
                />
            )}

            <div className="space-y-4 mt-6">
                {Object.entries(formData).map(([name, placeholder]) => (
                    <div key={name} className="w-full">
                        <input
                            type="text"
                            name={name}
                            placeholder={placeholder}
                            value={formValues[name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
            </div>

            {errorMessageText && isError && (
                <p className="text-red-500 text-sm mt-2 text-start">
                    {errorMessageText}
                </p>
            )}

            <button
                type="submit"
                className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
                {continueBtnText}
            </button>
        </form>
    );
};

FormPage.propTypes = {
    titleText: PropTypes.string,
    description: PropTypes.string,
    formData: PropTypes.object.isRequired,
    continueBtnText: PropTypes.string,
    errorMessageText: PropTypes.string,
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default FormPage;