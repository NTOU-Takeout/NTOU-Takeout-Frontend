import React from "react";

const DataForm = ({ formData, inputValues, currentStep, onInputChange }) => {
    const fieldKeys = ["email", "code", "newPassword", "confirmPassword"];

    return (
        <div className="mt-8 w-[70vw]">
            <form>
                {formData.map((placeholder, index) => {
                    const fieldKey = currentStep === 2 ? fieldKeys[index + 2] : fieldKeys[currentStep];
                    return (
                        <input
                            key={index}
                            type={currentStep === 0 ? "email" : currentStep === 1 ? "text" : "password"}
                            placeholder={placeholder}
                            value={inputValues[fieldKey] || ""}
                            onChange={(e) => onInputChange(fieldKey, e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                        />
                    );
                })}
            </form>
        </div>
    );
};

export default DataForm;
