import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "../stores/selectionStore";
import Selectionbar from "./Selectionbar";

const Searchbar = () => {
    const showSelectionBar = useSelectionStore(
        (state) => state.showSelectionBar,
    );
    const setShowSelectionBar = useSelectionStore(
        (state) => state.setShowSelectionBar,
    );
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
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    console.log(selectedSortBy, selectedSortDir);

    return (
        <div className="font-notoTC flex flex-col items-center w-full max-w-[800px] my-5 mx-auto box-border">
            <div className="flex items-center justify-between w-full px-2">
                <div
                    className="relative text-2xl flex items-center justify-center cursor-pointer"
                    onClick={toggleSelectionBar}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {!(selectedSortBy === "" && selectedSortDir === "") && (
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
            {showSelectionBar && <Selectionbar></Selectionbar>}
        </div>
    );
};

export default Searchbar;
