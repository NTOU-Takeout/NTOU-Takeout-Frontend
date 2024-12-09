import PropTypes from "prop-types";
import useDishEditBarStore from "../../stores/merchantDishEditBar";
import MerchantDishEditHeader from "../../components/merchantManagePage/merchantDishEditComponents/merchantDishEditHeader";
import MerchantDishEditForm from "../../components/merchantManagePage/merchantDishEditComponents/MerchantDishEditForm";
//import MerchantDishEditOptions from "../../components/merchantManagePage/merchantDishEditComponents/merchantDishEditOptions";
import MerchantDishEditOptionsList from "../../components/merchantManagePage/merchantDishEditComponents/MerchantDishEditOptionsList";
function MerchantDishEditPage({ dishDetail }) {
    const { name, options, pictureURL, price, catogory } = dishDetail;
    const isDishBarOpen = useDishEditBarStore((state) => state.isOpen);
    const dish = useDishEditBarStore((state) => state.dish);
    const closeDishEditBar = useDishEditBarStore(
        (state) => state.closeDishEditBar,
    );
    console.log(dishDetail);
    const handleSave = () => {
        closeDishEditBar();
        console.log("SAve");
    };

    const handleBack = () => {
        closeDishEditBar();
        console.log("Back");
    };
    const handleImageUpload = () => {
        console.log("image");
    };

    return (
        <div>
            <MerchantDishEditHeader
                dishName={name}
                onBack={handleBack}
                onSave={handleSave}
            ></MerchantDishEditHeader>
            <MerchantDishEditForm
                defaultName={name}
                defaultDescription={"好吃的飯"}
                defaultPrice={price}
                defaultCategory={catogory}
                onImageUpload={handleImageUpload}
            ></MerchantDishEditForm>
            <MerchantDishEditOptionsList></MerchantDishEditOptionsList>
        </div>
    );
}

MerchantDishEditPage.propTypes = {
    dishDetail: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                items: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        price: PropTypes.number.isRequired,
                    }),
                ).isRequired,
            }),
        ).isRequired,
        pictureURL: PropTypes.string,
        price: PropTypes.number.isRequired,
        catogory: PropTypes.string,
    }).isRequired,
};

export default MerchantDishEditPage;
