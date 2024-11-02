import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "../stores/selectionStore";

const Searchbar = () => {
    const [showSelectionBar, setShowSelectionBar] = useState(false);
    const selectedFilter = useSelectionStore((state) => state.selectedFilter);
    const selectedSorter = useSelectionStore((state) => state.selectedSorter);
    const selectedKeyword = useSelectionStore((state) => state.selectedKeyword);
    const isSubmitted = useSelectionStore((state) => state.isSubmitted);
    const setSelectedFilter = useSelectionStore(
        (state) => state.setSelectedFilter,
    );
    const setSelectedSorter = useSelectionStore(
        (state) => state.setSelectedSorter,
    );
    const setSelectedKeyword = useSelectionStore(
        (state) => state.setSelectedKeyword,
    );
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);

    useEffect(() => {
        setSelectedFilter("");
        setSelectedSorter("");
        setSelectedKeyword("");
        setIsSubmitted(false);
    }, []);
    const toggleSelectionBar = () => {
        setShowSelectionBar(!showSelectionBar);
    };

    const handleSubmit = () => {
        const keyword = document.getElementById("inputKeyword").value;
        setSelectedKeyword(keyword);
        setIsSubmitted(true);
        setShowSelectionBar(false);
    };

    const handleFilterClick = (value) => {
        setSelectedFilter(selectedFilter === value ? "" : value);
    };

    const handleSorterClick = (value) => {
        setSelectedSorter(selectedSorter === value ? "" : value);
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="font-notoTC flex flex-col items-center w-full max-w-[800px] my-5 mx-auto box-border">
            <div className="flex items-center justify-between w-full px-2">
                <div
                    className="relative text-2xl flex items-center justify-center cursor-pointer"
                    onClick={toggleSelectionBar}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {!(selectedFilter == "" && selectedSorter == "") && (
                        <div className="absolute -top-[17px] right-[-4px] z-50">
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="w-3"
                                style={{ color: "#ff0a0a" }}
                            />
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    className="flex-grow mx-2 border-b-2 border-black outline-none text-lg py-1"
                    placeholder="想吃什麼..."
                    id="inputKeyword"
                    onKeyDown={handleEnter}
                />
                <div
                    className="text-2xl flex items-center justify-center cursor-pointer"
                    onClick={handleSubmit}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>

            {/* selectionBar */}
            {showSelectionBar && (
                <div className="font-notoTC w-[361px] max-w-[800px] rounded-xl bg-white border-gray-700 mt-2 p-4 animate-slide-down">
                    <div className="flex justify-around w-full">
                        <div className="flex flex-col w-[33%]">
                            <p className="text-xl">篩選</p>
                            <label className="mt-2 flex justify-between items-center cursor-pointer">
                                評價 (預設)
                                <input
                                    type="radio"
                                    checked={selectedFilter === "rating"}
                                    onChange={() => handleFilterClick("rating")}
                                    onClick={() => handleFilterClick("rating")}
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="filter"
                                />
                            </label>
                            <label className="mt-2 flex justify-between items-center cursor-pointer">
                                平均花費
                                <input
                                    type="radio"
                                    checked={selectedFilter === "averageSpend"}
                                    onChange={() =>
                                        handleFilterClick("averageSpend")
                                    }
                                    onClick={() =>
                                        handleFilterClick("averageSpend")
                                    }
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="filter"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col w-[33%]">
                            <p className="text-xl">排序</p>
                            <label className="mt-2 flex justify-between items-center cursor-pointer">
                                由高到低
                                <input
                                    type="radio"
                                    checked={selectedSorter === "desc"}
                                    onChange={() => handleSorterClick("desc")}
                                    onClick={() => handleSorterClick("desc")}
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="sorter"
                                />
                            </label>
                            <label className="mt-2 flex justify-between items-center cursor-pointer">
                                由低到高
                                <input
                                    type="radio"
                                    checked={selectedSorter === "asc"}
                                    onChange={() => handleSorterClick("asc")}
                                    onClick={() => handleSorterClick("asc")}
                                    className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                                    name="sorter"
                                />
                            </label>
                            <div
                                className="mt-2 flex justify-end items-center cursor-pointer"
                                onClick={handleSubmit}
                            >
                                <div className="border-2 rounded-xl border-black w-[50%] flex justify-around items-center py-1">
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
