import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "../stores/selectionStore";

const Searchbar = () => {
    const [showSelectionBar, setShowSelectionBar] = useState(false);
    const selectedSortBy = useSelectionStore((state) => state.selectedSortBy);
    const selectedSortDir = useSelectionStore((state) => state.selectedSortDir);
    const selectedKeyword = useSelectionStore((state) => state.selectedKeyword);
    const isSubmitted = useSelectionStore((state) => state.isSubmitted);
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

    useEffect(() => {
        setSelectedSortBy("");
        setSelectedSortDir("");
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

    const handleSortByClick = (value) => {
        setSelectedSortBy(selectedSortBy === value ? "" : value);
    };

    const handleSortDirClick = (value) => {
        setSelectedSortDir(selectedSortDir === value ? "" : value);
        console.log(selectedSortDir, value);
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
                    {!(selectedSortBy == "" && selectedSortDir == "") && (
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
                                    onChange={() =>
                                        handleSortByClick("averageSpend")
                                    }
                                    onClick={() =>
                                        handleSortByClick("averageSpend")
                                    }
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
            )}
        </div>
    );
};

export default Searchbar;
