import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ReceiveOrderNotify = ({
    title = "接收訂單？",
    number = 1241213,
    finishTime = 6,
    items,
    onBack,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={onBack}
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    {title}
                </h2>
                <p className="text-sm font-medium text-gray-600 mb-4">
                    單號 {number}
                </p>
                <ul className="text-sm font-medium text-gray-700 mb-4">
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.name} {item.quantity}份
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-center mb-6">
                    <span className="text-sm font-medium text-gray-600 mr-2">
                        預估完成時間
                    </span>
                    <div className="bg-gray-200 rounded-lg px-4 py-2 text-center text-gray-700">
                        {finishTime}
                    </div>
                    <span className="text-sm font-medium text-gray-600 ml-2">
                        分鐘
                    </span>
                </div>
                <div className="flex flex-col space-y-4">
                    <button
                        className="w-full border-2 border-green-800 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700"
                        onClick={onConfirm}
                    >
                        確認接單
                    </button>
                    <button
                        className="w-full border-2 border-red-800 bg-red-400 text-white font-bold py-2 rounded-md hover:bg-red-600"
                        onClick={onCancel}
                    >
                        取消接單
                    </button>
                </div>
            </div>
        </div>
    );
};

ReceiveOrderNotify.propTypes = {
    title: PropTypes.string,
    number: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        }),
    ).isRequired,
    finishTime: PropTypes.number.isRequired,
    onBack: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default ReceiveOrderNotify;
