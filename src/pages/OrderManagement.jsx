import UnacceptedList from "../components/orderManagementPage/UnacceptedList/OrderList";
import AcceptedList from "../components/orderManagementPage/AcceptedList/OrderList";

function OrderManagement() {
    return (
        <div>
            <UnacceptedList></UnacceptedList>
            <AcceptedList></AcceptedList>
        </div>
    );
}

export default OrderManagement;
