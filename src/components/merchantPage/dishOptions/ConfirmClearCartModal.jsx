import PropTypes from 'prop-types';

const ConfirmClearCartModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-w-full font-notoTC">
                <p className="text-md text-gray-800 px-4">
                    購物車已有其他商店的商品，若要加入則會清空購物車<br />
                    確定要新增嗎?
                </p>
                <div className="flex justify-center space-x-14 mt-6">
                    <button
                        className="border border-gray-400 text-gray-600 py-1 px-4 rounded-lg"
                        onClick={onCancel}
                    >
                        不要新增
                    </button>
                    <button
                        className="bg-orange-500 text-white py-1 px-4 rounded-lg"
                        onClick={onConfirm}
                    >
                        確定新增
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmClearCartModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default ConfirmClearCartModal;
