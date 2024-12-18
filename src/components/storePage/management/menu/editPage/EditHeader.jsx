import PropTypes from "prop-types";
import Header from "../../../home/Header";
const EditHeader = ({ dishName, onSave, onBack }) => {
    const saveButton = (
        <button
            onClick={onSave}
            className="bg-orange-500 text-white px-4 py-1 rounded-lg font-bold hover:bg-orange-600"
        >
            保存
        </button>
    );

    return (
        <Header
            title={dishName}
            onLeftClick={onBack}
            rightComponents={[saveButton]}
        ></Header>
    );
};
EditHeader.propTypes = {
    dishName: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onBack: PropTypes.func,
};
export default EditHeader;
