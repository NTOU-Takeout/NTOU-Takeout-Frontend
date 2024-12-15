import AcceptedList from '../components/OrderManagement/AcceptedList';
import UnacceptedList from '../components/OrderManagement/UnacceptedList';

const OrderManagement = () => {
    return (
        <div>
            <UnacceptedList></UnacceptedList>
            <AcceptedList></AcceptedList>
        </div>
    );
}

export default OrderManagement;
