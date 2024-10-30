import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const OptionCard = ({
    title,
    description,
    options = [], // pass in an array of options
    type, // default to single selection
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
        if (type === "single") {
            setSelectedOptions([option.name]);
        } else {
            // multiple selection
            setSelectedOptions((prev) => {
                if (prev.includes(option.name)) {
                    return prev.filter((opt) => opt !== option.name); //cancel selection
                } else {
                    return [...prev, option.name]; // new selection
                }
            });
        }
    };

    return (
        <div className="border rounded-lg p-4 max-w-sm mx-auto mb-8 mt-8 font-notoTC">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>

            <div className="mt-4 space-y-2">
                {options.map((option) => (
                    <label key={option.name} className="block cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedOptions.includes(option.name)} // render checkbox based on selection
                            onChange={() => handleCheckboxChange(option)} // handle checkbox change
                        />
                        <span className="flex items-center justify-between">
                            <span className="flex items-center">
                                <FontAwesomeIcon
                                    icon={
                                        selectedOptions.includes(option.name)
                                            ? faCheckSquare
                                            : faSquare
                                    }
                                    className="text-gray-500 mr-2"
                                />
                                {option.name}
                            </span>
                            <span className="text-gray-600">
                                {option.extraCost > 0
                                    ? `+${option.extraCost}元`
                                    : "免費"}
                            </span>
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};
OptionCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            extraCost: PropTypes.number,
        }),
    ),
    type: PropTypes.oneOf(["single", "multiple"]),
};
export default OptionCard;
