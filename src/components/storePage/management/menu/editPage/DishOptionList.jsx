import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleNavBar from "../../../../common/ToggleNavBar";
import useEditDishStore from "../../../../../stores/EditDishStore";

const DishOptionList = ({ group, groupIndex, onDeleteGroup }) => {
    const setGroup = useEditDishStore((state) => state.setAttribute);

    const [options, setOptions] = useState(group.attributeOptions);
    const [groupName, setGroupName] = useState(group.name);

    const [isEditingGroupName, setIsEditingGroupName] = useState(false);
    const [editingOptionIndex, setEditingOptionIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [isSingleSelect, setIsSingleSelect] = useState(true);

    const dish = useEditDishStore((state) => state.dish);
    const updateGroupName = useEditDishStore(
        (state) => state.updateAttributeName,
    );
    console.log(dish);
    useEffect(() => {
        console.log(groupIndex);
        console.log(groupName, options, isSingleSelect);
        setGroup(groupIndex, { groupName, options, isSingleSelect });
    }, [options, groupName, isSingleSelect, groupIndex, setGroup]);

    const handleDeleteOption = (index) => {
        setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    };

    const handleOptionSave = (e, index) => {
        if (e.key === "Enter") {
            const newValue = e.target.value;
            setOptions((prevOptions) =>
                prevOptions.map((option, i) =>
                    i === index
                        ? {
                              ...option,
                              [editingField]:
                                  editingField === "price"
                                      ? parseFloat(newValue) || 0
                                      : newValue,
                          }
                        : option,
                ),
            );
            setEditingOptionIndex(null);
            setEditingField(null);
        }
    };

    const seleteOptions = {
        單選: () => setIsSingleSelect(true),
        複選: () => setIsSingleSelect(false),
    };

    const handleSetGroupName = (value) => {
        updateGroupName(groupIndex, value);
        setGroupName(value);
    };

    return (
        <div className="p-4 bg-white border rounded-lg shadow-md mb-6">
            {/* Group Header */}
            <div className="flex justify-between items-center mb-4">
                {isEditingGroupName ? (
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => handleSetGroupName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsEditingGroupName(false);
                            }
                        }}
                        className="border rounded px-2 py-1 text-lg font-bold focus:ring-orange-500 focus:outline-none"
                    />
                ) : (
                    <h3 className="font-bold text-lg">{groupName}：</h3>
                )}

                <div className="flex space-x-2">
                    <button
                        className="text-orange-500 hover:text-orange-700 text-xl"
                        onClick={() => setIsEditingGroupName(true)}
                    >
                        <FontAwesomeIcon icon={faEdit} size="base" />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={onDeleteGroup}
                    >
                        <FontAwesomeIcon icon={faTrash} size="base" />
                    </button>
                </div>
            </div>

            {/* Options */}
            {options.map((option, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                >
                    <div className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            className="mr-2 w-5 h-5 bg-orange-100 rounded"
                            disabled
                        />
                        {editingOptionIndex === index &&
                        editingField === "name" ? (
                            <input
                                type="text"
                                defaultValue={option.name}
                                onKeyDown={(e) => handleOptionSave(e, index)}
                                className="border rounded px-2 py-1 text-sm focus:ring-orange-500"
                            />
                        ) : (
                            <span
                                onClick={() => {
                                    setEditingOptionIndex(index);
                                    setEditingField("name");
                                }}
                                className="cursor-pointer hover:underline"
                            >
                                {option.name}
                            </span>
                        )}
                        {editingOptionIndex === index &&
                        editingField === "price" ? (
                            <input
                                type="number"
                                defaultValue={option.price}
                                onKeyDown={(e) => handleOptionSave(e, index)}
                                className="border rounded px-2 py-1 text-sm focus:ring-orange-500"
                            />
                        ) : (
                            <span
                                onClick={() => {
                                    setEditingOptionIndex(index);
                                    setEditingField("price");
                                }}
                                className="px-3 border rounded-xl text-black border-black cursor-pointer hover:underline"
                            >
                                + {option.price}元
                            </span>
                        )}
                    </div>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteOption(index)}
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                </div>
            ))}

            {/* Add Option */}
            <button
                className="text-orange-500 mt-2"
                onClick={() =>
                    setOptions((prev) => [
                        ...prev,
                        { name: "新選項", price: 0 },
                    ])
                }
            >
                新增選項...
            </button>

            {/* Toggle Single/Multi Select */}
            <div className="flex justify-end space-x-4 mt-4">
                <div className="flex border-black border-[2px] rounded-2xl overflow-hidden">
                    <ToggleNavBar options={seleteOptions} />
                </div>
            </div>
        </div>
    );
};

DishOptionList.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        attributeOptions: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    groupIndex: PropTypes.number.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
};

export default DishOptionList;
