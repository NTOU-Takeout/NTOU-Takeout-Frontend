import React, { useRef, useEffect, useState } from "react";

const LongPressDemo = () => {
    const inputRef = useRef(null); // 引用輸入框
    const [inputValue, setInputValue] = useState(""); // 儲存輸入框的值
    const [isEditing, setIsEditing] = useState(false); // 控制是否處於編輯狀態

    const handleOutsideClick = (event) => {
        // 判斷點擊是否在輸入框外
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsEditing(false); // 停止編輯
        }
    };

    useEffect(() => {
        // 監聽全局 mousedown 事件
        document.addEventListener("mousedown", handleOutsideClick);

        // 清除監聽器
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // 更新輸入框值
    };

    const handleInputClick = () => {
        setIsEditing(true); // 切換到編輯狀態
    };

    return (
        <div className="p-4 space-y-4">
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <div
                    ref={inputRef}
                    onClick={handleInputClick}
                    className="border px-3 py-2 rounded cursor-pointer"
                >
                    {inputValue || "Click to edit..."}
                </div>
            )}
        </div>
    );
};

export default LongPressDemo;
