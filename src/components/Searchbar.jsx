import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Searchbar = () => {
    const [showSelectionBar, setShowSelectionBar] = useState(false);

    // 切換選單顯示狀態
    const toggleSelectionBar = () => {
        setShowSelectionBar(!showSelectionBar);
    };

    return (
        <div className="font-notoTC flex flex-col items-center w-full max-w-[800px] my-5 mx-auto box-border">
            <div className="flex items-center justify-between w-full px-2">
                {/* searchbar */}
                <div
                    className="text-2xl flex items-center justify-center cursor-pointer"
                    onClick={toggleSelectionBar}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </div>
                <input
                    type="text"
                    className="flex-grow mx-2 border-b-2 border-black outline-none text-lg py-1"
                    placeholder="想吃什麼..."
                />
                <div className="text-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>

            {/* selectionBar */}
            {showSelectionBar && (
                <div className="font-notoTC w-[361px] max-w-[800px] rounded-xl bg-white  border-gray-700  mt-2 p-4 animate-slide-down">
                    <div className="flex justify-around w-full">
                        <div className="flex flex-col w-[33%]">
                            <p className="text-xl">篩選</p>
                            <label className="mt-2 flex justify-between items-center">
                                評價 (預設)
                                <input
                                    type="radio"
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="filter"
                                />
                            </label>
                            <label className="mt-2 flex justify-between items-center">
                                平均花費
                                <input
                                    type="radio"
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="filter"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col w-[33%]">
                            <p className="text-xl">排序</p>
                            <label className="mt-2 flex justify-between items-center">
                                由高到低
                                <input
                                    type="radio"
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="sorter"
                                />
                            </label>
                            <label className="mt-2 flex justify-between items-center">
                                由低到高
                                <input
                                    type="radio"
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="sorter"
                                />
                            </label>
                            <div className="mt-2 flex justify-end items-center">
                                <div className="border-2 rounded-xl border-black w-[50%] flex justify-around items-end">
                                    <span>確認</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Searchbar;
