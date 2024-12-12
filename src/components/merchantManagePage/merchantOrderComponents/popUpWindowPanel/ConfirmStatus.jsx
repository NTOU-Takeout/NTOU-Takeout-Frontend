import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ConfirmStatus = ({
    title,
    number,
    items,
    onBack,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={onBack}
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    確認餐點已{title}
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

                <div className="flex flex-col space-y-4">
                    <button
                        className="w-full border-2 border-green-800 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700"
                        onClick={onConfirm}
                    >
                        確認
                    </button>
                    <button
                        className="w-full border-2 border-red-800 bg-red-400 text-white font-bold py-2 rounded-md hover:bg-red-600"
                        onClick={onCancel}
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmStatus.propTypes = {
    title: PropTypes.string,
    number: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        }),
    ).isRequired,
    onBack: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default ConfirmStatus;
