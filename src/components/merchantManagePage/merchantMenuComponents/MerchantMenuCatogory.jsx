import PropTypes from "prop-types";
import MerchantMenuItemList from "./MerchantMenuItemList";

const MerchantMenuCategory = ({ categoryName }) => {
    return (
        <div className="p-6 bg-orange-100 w-[90%] rounded-lg shadow-md mb-10">
            <h2 className="text-2xl font-bold flex items-center mb-4">
                {categoryName}
                <span className="text-orange-500 ml-2">✎</span>
            </h2>
            <MerchantMenuItemList></MerchantMenuItemList>
        </div>
    );
};

MerchantMenuCategory.propTypes = {
    categoryName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            price: PropTypes.number.isRequired,
            pictureURL: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default MerchantMenuCategory;
