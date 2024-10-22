import { useEffect, useState } from 'react';
import MenuDishDetail from '../components/merchantPage/MenuDishDetail';
import { useParams } from 'react-router-dom';
import useMerchantStore from '../stores/merchantStore';
function Menu() {
  // const getMerchantById = useMerchantStore((state) => state.getMerchantById);
  const { merchantId } = useParams();
  const getMerchantById = useMerchantStore((state) => state.getMerchantById);

  const [merchant, setMerchant] = useState(null);
  useEffect(() => {
    const merchantData = getMerchantById(merchantId); // 在 effect 中呼叫，避免初始化循環
    setMerchant(merchantData);
    console.log("merchant:", merchantData);
  }, [merchantId, getMerchantById]);
  return (
    <div>{merchantId}</div>
    // <MenuDishDetail></MenuDishDetail>
  );
}   

export default Menu;     