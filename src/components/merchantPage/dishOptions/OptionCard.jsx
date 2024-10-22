import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const OptionCard = ({
    title = "飯糰大小",
    description = "請選項目",
    options = [], // 傳入選項物件數組
    type = 'single' // 默認為單選
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]); // 存儲當前選擇的選項，默認為空數組

    const handleCheckboxChange = (option) => {
        if (type === 'single') {
            // 單選模式，確保僅選擇一個選項
            setSelectedOptions([option.name]); // 僅選擇一個選項
        } else {
            // 多選模式
            setSelectedOptions((prev) => {
                if (prev.includes(option.name)) {
                    return prev.filter(opt => opt !== option.name); // 取消選擇
                } else {
                    return [...prev, option.name]; // 新增選擇
                }
            });
        }
    };

    return (
        <div className="border rounded-lg p-4 max-w-sm mx-auto mb-8 mt-8">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>

            <div className="mt-4 space-y-2">
                {options.map((option) => (
                    <label key={option.name} className="block cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedOptions.includes(option.name)} // 根據選項名稱判斷是否選中
                            onChange={() => handleCheckboxChange(option)} // 傳遞選項物件
                        />
                        <span className="flex items-center justify-between">
                            <span className="flex items-center">
                                <FontAwesomeIcon
                                    icon={selectedOptions.includes(option.name) ? faCheckSquare : faSquare}
                                    className="text-gray-500 mr-2"
                                />
                                {option.name} {/* 顯示選項名稱 */}
                            </span>
                            <span className="text-gray-600">{option.extraCost > 0 ? `+${option.extraCost}元` : '免費'}</span>
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default OptionCard;
