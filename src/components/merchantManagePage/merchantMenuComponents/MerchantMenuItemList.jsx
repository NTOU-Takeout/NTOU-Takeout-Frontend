import PropTypes from "prop-types";
import MerchantMenuItem from "./MerchantMenuItem";
import useDishEditBarStore from "../../../stores/merchantDishEditBar";

const MerchantMenuItemList = ({ categoryName }) => {
    const toggleDishEditBar = useDishEditBarStore(
        (state) => state.toggleDishEditBar,
    );
    const setDish = useDishEditBarStore((state) => state.setDish);

    const items = [
        {
            id: 1,
            name: "招牌牛肉麵",
            options: ["大碗", "加辣"],
            price: 150,
            pictureURL: "https://picsum.photos/200/300?grayscale",
            catogory: categoryName,
        },
        {
            id: 2,
            name: "日式炸雞飯",
            options: ["加蛋", "無辣"],
            price: 120,
            pictureURL: "https://picsum.photos/200/300?grayscale",
            catogory: categoryName,
        },
        {
            id: 3,
            name: "美式漢堡",
            options: ["套餐", "附薯條"],
            price: 180,
            pictureURL: "https://picsum.photos/200/300?grayscale",
            catogory: categoryName,
        },
        {
            id: 4,
            name: "義大利麵",
            options: ["奶油醬", "培根"],
            price: 130,
            pictureURL: "https://picsum.photos/200/300?grayscale",
            catogory: categoryName,
        },
        {
            id: 5,
            name: "香煎鯛魚",
            options: ["清蒸", "加檸檬"],
            price: 200,
            pictureURL: "https://picsum.photos/200/300?grayscale",
            catogory: categoryName,
        },
    ];

    const handleDelete = (id) => {
        //delete idth dish
    };

    const handleEdit = (id) => {
        const item = items.find((item) => item.id === id);
        toggleDishEditBar();
        setDish(item);
    };
    return (
        <div className="p-4 ">
            {items.map((item) => (
                <MerchantMenuItem
                    key={item.id}
                    name={item.name}
                    options={item.options}
                    price={item.price}
                    pictureURL={item.pictureURL}
                    onDelete={() => handleDelete(item.id)}
                    onEdit={() => handleEdit(item.id)}
                />
            ))}
        </div>
    );
};
MerchantMenuItemList.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default MerchantMenuItemList;
