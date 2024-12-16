import PropTypes from "prop-types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MerchantMenuItem = ({
    name,
    options,
    price,
    pictureURL,
    onDelete,
    onEdit,
}) => {
    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete();
    };

    return (
        <div
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
            onClick={onEdit}
        >
            <div className="flex items-center">
                <img
                    src={pictureURL}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-gray-500 text-sm">
                        {options.join(", ")}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
                <p className="text-xl font-bold text-black">${price}</p>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDeleteClick}
                        className="text-red-500 hover:text-red-700 text-xl z-30"
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                    <button
                        onClick={onEdit}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
                    >
                        編輯
                    </button>
                </div>
            </div>
        </div>
    );
};

MerchantMenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    pictureURL: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

MerchantMenuItem.defaultProps = {
    onDelete: () => {},
    onEdit: () => {},
};

export default MerchantMenuItem;
