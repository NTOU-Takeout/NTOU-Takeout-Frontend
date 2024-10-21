import MenuDishDetail from '../components/merchantPage/MenuDishDetail';
import { useParams } from 'react-router-dom';
function Menu() {
  const { merchantId } = useParams();
  return (
    <div>{merchantId}</div>
    // <MenuDishDetail></MenuDishDetail>
  );
}   

export default Menu;    