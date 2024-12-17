import AcceptedList from '../components/storePage/managment/AcceptedList';
import UnacceptedList from '../components/storePage/managment/UnacceptedList';

const OrderManagement = () => {
    return (
        <div>
            <UnacceptedList></UnacceptedList>
            <AcceptedList></AcceptedList>
        </div>
    );
}

export default OrderManagement;
