import PropTypes from "prop-types";

const OrderItem = ({ item }) => {
    const { name, imageUrl, price, quantity, chosenAttributes, note } = item;

    let totalExtraCost = 0;
    const formattedAttributes = chosenAttributes?.length
        ? chosenAttributes.map(attr => {
            totalExtraCost += attr.extraCost || 0;
            return `${attr.name}: ${attr.chosenOption}`;
        }).join(", ")
        : "";

    return (
        <div className="flex items-center border-b py-4 relative min-h-24">
            <img
                src={imageUrl}
                alt={name}
                className="w-20 h-20 object-cover rounded-md"
            />
            <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg">{name}</h3>
                {formattedAttributes && <p className="text-sm text-gray-500">
                    {formattedAttributes} +${totalExtraCost}
                </p>}

                {note && <p className="text-sm text-gray-500">{note}</p>}
            
                <p className="text-slate-900 text-md">${price.toFixed(2)}</p>
            </div>
            <p className="font-bold text-gray-700 absolute bottom-4 right-4">共{quantity}份</p>
        </div>
    );
};

OrderItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        chosenAttributes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            chosenOption: PropTypes.string.isRequired,
            extraCost: PropTypes.number,
        })),
        note: PropTypes.string,
    }).isRequired,
};

export default OrderItem;
