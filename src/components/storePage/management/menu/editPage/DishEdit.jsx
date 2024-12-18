import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import DishForm from "./DishForm";
import DishOptionList from "./DishOptionList";
import { useState } from "react";
import useEditDishStore from "../../../../../stores/EditDishStore";
import useMenuStore from "../../../../../stores/menuStore";
function DishEdit({ dishData, onClose }) {
    const [description, setDescription] = useState(dishData.description);
    const [name, setName] = useState(dishData.name);
    const [price, setPrice] = useState(dishData.price);
    const [categoryName, setCategoryName] = useState(dishData.categoryName);
    const [groups, setGroups] = useState(dishData.groups);

    const dish = useEditDishStore((state) => state.dish);
    const deleteGroup = useEditDishStore((state) => state.deleteGroup);

    const updateDishById = useMenuStore((state) => state.updateDishById);

    const handleSave = () => {
        console.log("new dish");
        console.log(dish);
        updateDishById(dish.id, dish);

        onClose();
    };

    const handleBack = () => {
        onClose();
    };

    const handleImageUpload = () => {
        console.log("Image upload");
    };

    const handleDeleteGroup = (groupIndex) => {
        deleteGroup(groupIndex);
        setGroups((prevGroups) =>
            prevGroups.filter((_, i) => i !== groupIndex),
        );
    };

    const handleUpdateGroup = (groupIndex, updatedGroup) => {
        setGroups((prevGroups) =>
            prevGroups.map((group, i) =>
                i === groupIndex ? updatedGroup : group,
            ),
        );
    };

    return (
        <div>
            <EditHeader
                dishName={name}
                onBack={handleBack}
                onSave={handleSave}
            ></EditHeader>

            <DishForm
                defaultName={name}
                defaultDescription={description}
                defaultPrice={price}
                defaultCategory={categoryName}
                onImageUpload={handleImageUpload}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onPriceChange={setPrice}
                onCategoryChange={setCategoryName}
            ></DishForm>

            {groups.map((singleGroup, index) => (
                <DishOptionList
                    key={index}
                    group={singleGroup}
                    groupIndex={index}
                    onDeleteGroup={() => handleDeleteGroup(index)}
                    onUpdateGroup={(updatedGroup) =>
                        handleUpdateGroup(index, updatedGroup)
                    }
                ></DishOptionList>
            ))}
        </div>
    );
}

DishEdit.propTypes = {
    dishData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        categoryName: PropTypes.string,
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                groupName: PropTypes.string.isRequired,
                options: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        price: PropTypes.number.isRequired,
                    }),
                ).isRequired,
            }),
        ),
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DishEdit;
