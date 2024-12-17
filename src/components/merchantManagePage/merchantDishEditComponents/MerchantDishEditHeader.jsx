import PropTypes from "prop-types";

const MerchantDishEditHeader = ({ dishName, onSave, onBack }) => {
    return (
        <header className="flex items-center justify-between bg-orange-500 text-white px-4 py-2 shadow-md z-50">
            <div className="flex items-center justify-between w-[125px]">
                <button
                    onClick={onBack}
                    className="text-xl font-bold flex items-center"
                >
                    ←
                </button>
                <h1 className="text-lg font-bold">{dishName}</h1>
            </div>
            <button
                onClick={onSave}
                className="bg-white text-orange-500 px-4 py-1 rounded-lg font-bold hover:bg-gray-100"
            >
                保存
            </button>
        </header>
    );
};

MerchantDishEditHeader.propTypes = {
    dishName: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onBack: PropTypes.func,
};

export default MerchantDishEditHeader;
