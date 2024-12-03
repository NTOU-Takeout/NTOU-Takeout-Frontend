import MerchantMenuItem from "./MerchantMenuItem";

const MerchantMenuItemList = () => {
    const items = [
        {
            id: 1,
            name: "招牌牛肉麵",
            options: ["大碗", "加辣"],
            price: 150,
            pictureURL: "https://picsum.photos/200/300?grayscale",
        },
        {
            id: 2,
            name: "日式炸雞飯",
            options: ["加蛋", "無辣"],
            price: 120,
            pictureURL: "https://picsum.photos/200/300?grayscale",
        },
        {
            id: 3,
            name: "美式漢堡",
            options: ["套餐", "附薯條"],
            price: 180,
            pictureURL: "https://picsum.photos/200/300?grayscale",
        },
        {
            id: 4,
            name: "義大利麵",
            options: ["奶油醬", "培根"],
            price: 130,
            pictureURL: "https://picsum.photos/200/300?grayscale",
        },
        {
            id: 5,
            name: "香煎鯛魚",
            options: ["清蒸", "加檸檬"],
            price: 200,
            pictureURL: "https://picsum.photos/200/300?grayscale",
        },
    ];

    const handleDelete = (id) => {
        console.log(`Item with id ${id} deleted!`);
    };

    const handleEdit = (id) => {
        const item = items.find((item) => item.id === id);
        if (item) {
            console.log(`Edit clicked for item:`, item);
        } else {
            console.log(`Item with id ${id} not found!`);
        }
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

export default MerchantMenuItemList;
