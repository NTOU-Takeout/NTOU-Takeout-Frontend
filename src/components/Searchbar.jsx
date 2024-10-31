import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter as fliterIcon } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faSearch as searchIcon } from "@fortawesome/free-solid-svg-icons/faSearch";

const Searchbar = () => {
    return (
        <div className="font-notoTC flex items-center justify-between w-full max-w-[800px] my-5 mx-auto pl-2 pr-2 box-border">
            <div className="text-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={fliterIcon}></FontAwesomeIcon>
            </div>
            <input
                type="text"
                className="flex-grow mx-2  border-b-2 border-black outline-none text-lg py-1"
                placeholder="Type something here..."
            />
            <div className="text-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={searchIcon}></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default Searchbar;
