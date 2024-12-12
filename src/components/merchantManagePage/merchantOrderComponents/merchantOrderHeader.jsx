import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const MerchantOrderHeader = ({
    title = "訂單管理",
    orderNumber,
    leftIcon = faList,
    onLeftClick = () => {},
}) => {
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex justify-between items-center bg-orange-400 text-white shadow-md p-3">
            {/* Left Icon and Title */}
            <div className="text-xl flex items-center">
                <div className="cursor-pointer" onClick={onLeftClick}>
                    <FontAwesomeIcon icon={leftIcon} />
                </div>
                <span className="ml-2 text-lg font-bold">{title}</span>
            </div>

            {/* Order Number */}
            <div className="bg-orange-300 text-black px-4 py-1 rounded-full font-bold text-sm">
                共計 {orderNumber} 單
            </div>
        </header>
    );
};

MerchantOrderHeader.propTypes = {
    title: PropTypes.string,
    orderNumber: PropTypes.number,
    leftIcon: PropTypes.object,
    onLeftClick: PropTypes.func,
};

export default MerchantOrderHeader;
