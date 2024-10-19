import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const OptionCard = ({
    title = "飯糰大小",
    description = "請選1項",
    options = []
}) => {
  const [selectedOption, setSelectedOption] = useState(null); // 改成存儲一個選項

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option); // 選擇相同選項則取消選擇
  };

  return (
    <div className="border rounded-lg p-4 max-w-sm mx-auto mb-8 mt-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="mt-4 space-y-2">
        {options.map((option) => (
          <label key={option} className="block cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="flex items-center">
              <FontAwesomeIcon
                icon={selectedOption === option ? faCheckSquare : faSquare}
                className="text-gray-500 mr-2"
              />
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default OptionCard;
