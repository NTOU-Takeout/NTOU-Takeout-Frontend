import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Filter = ({ onBack }) => {
    const [orderTypes, setOrderTypes] = useState({
        cancelled: true,
        inProgress: true,
        pendingPickup: true,
        pickedUp: true,
    });

    const [order, setOrder] = useState({
        ascending: false,
        descending: true,
    });

    const [sortOptions, setSortOptions] = useState({
        orderTime: true,
    });

    const toggleOrderType = (type) => {
        setOrderTypes((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleOrder = (type) => {
        setOrder((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleSortOption = (type) => {
        setSortOptions((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="fixed font-bold top-0 left-0 w-full h-full flex justify-center items-center z-50">
            <div className="bg-white w-[250px] max-w-md p-6 rounded-lg shadow-xl relative overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon
                            icon={faFilter}
                            className="text-gray-600 mr-2"
                        />
                        <h2 className="text-lg text-gray-800">篩選</h2>
                    </div>
                    <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={onBack}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>

                <div className="mb-6 px-4">
                    <h3 className="w-[80px] border-b-2 border-black pb-1 text-left text-gray-700 mb-2">
                        訂單類型
                    </h3>
                    <div>
                        {Object.entries(orderTypes).map(([key, value]) => (
                            <label
                                key={key}
                                className="px-4 flex items-center space-x-2 mb-2 cursor-pointer"
                                onClick={() => toggleOrderType(key)}
                            >
                                <FontAwesomeIcon
                                    icon={value ? faSquareCheck : faSquare}
                                    className="text-gray-600"
                                />
                                <span className="text-sm text-gray-700">
                                    {key === "cancelled"
                                        ? "已取消"
                                        : key === "inProgress"
                                          ? "製作中"
                                          : key === "pendingPickup"
                                            ? "未取餐"
                                            : "已取餐"}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-2 px-4">
                    <h3 className="w-[50px] border-b-2 border-black pb-1 text-left text-gray-700 mb-2">
                        排序
                    </h3>
                    <div>
                        {Object.entries(order).map(([key, value]) => (
                            <label
                                key={key}
                                className="px-4 flex items-center space-x-2 mb-2 cursor-pointer"
                                onClick={() => toggleOrder(key)}
                            >
                                <FontAwesomeIcon
                                    icon={value ? faSquareCheck : faSquare}
                                    className="text-gray-600"
                                />
                                <span className="text-sm text-gray-700">
                                    {key === "ascending" ? "升序" : "降序"}
                                </span>
                            </label>
                        ))}
                        <div className="px-4 w-[120px]">
                            <hr className="border-black border-[1px]" />
                        </div>
                    </div>
                </div>

                <div className="mb-6 px-8">
                    <div>
                        {Object.entries(sortOptions).map(([key, value]) => (
                            <label
                                key={key}
                                className="flex items-center space-x-2 mb-2 cursor-pointer"
                            >
                                <FontAwesomeIcon
                                    icon={faSquareCheck}
                                    className="text-gray-600"
                                />
                                <span className="text-sm text-gray-700">
                                    下單時間
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Filter.propTypes = {
    onBack: PropTypes.func,
};

export default Filter;
