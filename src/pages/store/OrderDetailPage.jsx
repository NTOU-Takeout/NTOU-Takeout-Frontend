import PropTypes from "prop-types";
import useOrderStore from "../../stores/orderStore";
import Header from "../../components/orderPage/Header";
import UserInfo from "../../components/orderPage/UserInfo";
import OrderNote from "../../components/orderPage/OrderNote";
import OrderItem from "../../components/orderPage/OrderItem";
import Footer from "../../components/orderPage/Footer";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const { order, setEstimatedTime } = useOrderStore();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="font-sans bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Header */}
            <Header orderId={order.id} status={order.status} onBackClick={handleBackClick} />

            {/* Order items */}
            <div className="bg-white text-black flex-1 p-4 overflow-auto">
                <UserInfo user={order} />
                <OrderNote note={order.note} />
                {order.items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </div>

            {/* Footer */}
            <Footer
                estimatedTime={order.estimatedTime}
                onTimeChange={(value) => setEstimatedTime(value)}
            />
        </div>
    );
};

OrderDetails.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        note: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                imageUrl: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
            })
        ),
        estimatedTime: PropTypes.number.isRequired,
    }),
};

export default OrderDetails;
