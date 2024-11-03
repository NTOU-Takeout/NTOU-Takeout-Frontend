import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "../stores/selectionStore";

const Selectionbar = () => {
    const showSelectionBar = useSelectionStore(
        (state) => state.showSelectionBar,
    );
    const setShowSelectionBar = useSelectionStore(
        (state) => state.setShowSelectionBar,
    );
    const selectedSortBy = useSelectionStore((state) => state.selectedSortBy);
    const selectedSortDir = useSelectionStore((state) => state.selectedSortDir);
    const setSelectedSortBy = useSelectionStore(
        (state) => state.setSelectedSortBy,
    );
    const setSelectedSortDir = useSelectionStore(
        (state) => state.setSelectedSortDir,
    );
    const setSelectedKeyword = useSelectionStore(
        (state) => state.setSelectedKeyword,
    );
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);

    const handleSubmit = () => {
        const keyword = document.getElementById("inputKeyword").value;
        setSelectedKeyword(keyword);
        setIsSubmitted(true);
        setShowSelectionBar(false);
    };

    const handleSortByClick = (value) => {
        setSelectedSortBy(selectedSortBy === value ? "" : value);
    };

    const handleSortDirClick = (value) => {
        setSelectedSortDir(selectedSortDir === value ? "" : value);
        console.log(selectedSortDir, value);
    };
    return (
        <div className="font-notoTC w-[361px] max-w-[800px] rounded-xl bg-white border-gray-700 mt-2 p-4 animate-slide-down">
            <div className="flex justify-around w-full">
                <div className="flex flex-col w-[33%]">
                    <p className="text-xl">篩選</p>
                    <label className="mt-2 flex justify-between items-center cursor-pointer">
                        評價 (預設)
                        <input
                            type="radio"
                            checked={selectedSortBy === "rating"}
                            onChange={() => handleSortByClick("rating")}
                            onClick={() => handleSortByClick("rating")}
                            className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                            name="sortBy"
                        />
                    </label>
                    <label className="mt-2 flex justify-between items-center cursor-pointer">
                        平均花費
                        <input
                            type="radio"
                            checked={selectedSortBy === "averageSpend"}
                            onChange={() => handleSortByClick("averageSpend")}
                            onClick={() => handleSortByClick("averageSpend")}
                            className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                            name="sortBy"
                        />
                    </label>
                </div>
                <div className="flex flex-col w-[33%]">
                    <p className="text-xl">排序</p>
                    <label className="mt-2 flex justify-between items-center cursor-pointer">
                        由高到低
                        <input
                            type="radio"
                            checked={selectedSortDir === "desc"}
                            onChange={() => handleSortDirClick("desc")}
                            onClick={() => handleSortDirClick("desc")}
                            className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                            name="sortDir"
                        />
                    </label>
                    <label className="mt-2 flex justify-between items-center cursor-pointer">
                        由低到高
                        <input
                            type="radio"
                            checked={selectedSortDir === "asc"}
                            onChange={() => handleSortDirClick("asc")}
                            onClick={() => handleSortDirClick("asc")}
                            className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500"
                            name="sortDir"
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
    );
};

export default Selectionbar;
