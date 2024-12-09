import { useState } from "react";
import MerchantDishEditOptions from "./merchantDishEditOptions";

const MerchantDishEditOptionsList = () => {
    const [optionGroups, setOptionGroups] = useState([
        {
            id: 1,
            groupName: "甜度",
            options: [
                { name: "3分糖", price: 0 },
                { name: "5分糖", price: 0 },
                { name: "7分糖", price: 0 },
                { name: "9分糖", price: 10 },
            ],
        },
        {
            id: 2,
            groupName: "加料",
            options: [
                { name: "珍珠", price: 0 },
                { name: "粉圓", price: 0 },
                { name: "椰果", price: 0 },
                { name: "布丁", price: 10 },
            ],
        },
    ]);

    const handleAddGroup = () => {
        const newGroup = {
            id: Date.now(),
            groupName: `新選項`,
            options: [],
        };
        setOptionGroups([...optionGroups, newGroup]);
    };

    const handleDeleteGroup = (id) => {
        setOptionGroups((prev) => prev.filter((group) => group.id !== id));
    };

    return (
        <div className="p-4">
            {optionGroups.map((group) => (
                <MerchantDishEditOptions
                    key={group.id}
                    group={group}
                    onDeleteGroup={() => handleDeleteGroup(group.id)}
                />
            ))}
            <div className="flex justify-center mt-6">
                <button
                    className="text-orange-500 text-2xl"
                    onClick={handleAddGroup}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default MerchantDishEditOptionsList;
