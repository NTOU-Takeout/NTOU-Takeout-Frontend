import { useEffect, useState } from 'react';
import MenuDishDetail from '../components/merchantPage/MenuDishDetail';
import { useParams } from 'react-router-dom';
import useMerchantStore from '../stores/merchantStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import getStoreClient from '../api/store/getStoreClient';
import getMenuClient from '../api/menu/getMenuClient';


function Menu() {
  const { merchantId } = useParams();
  const getMerchantById = useMerchantStore((state) => state.getMerchantById);
  const [menuId, setMenuId] = useState(null);
  const [merchant, setMerchant] = useState(null);
  useEffect(() => {
    const merchantData = getMerchantById(merchantId);
    if(!merchantData) {
      async function getMerchantData() {
        console.log("error, refetching data");
        const data = await getStoreClient.getStoreById(merchantId);
        setMerchant(data);
      }
      getMerchantData();
    }
    setMerchant(merchantData);
    console.log("merchantData:", merchantData.menuId);
    setMenuId(merchantData?.menuId);
  }, [merchantId, getMerchantById]);

  const {
    data: menuCategoryList,
    isLoading: isMenuCategoryListLoading,
    isError: isMenuCategoryListError,
    error: menuCategoryListError,
  } = useQuery({
    queryKey: ['menuCategoryList', menuId],
    queryFn: getMenuClient.getMenuByMenuId(menuId),
  });

  useEffect(() => {
    console.log("menuCategoryList:", menuCategoryList);
  }, [menuCategoryList]);

  if (!merchant) {
    return <div className="flex justify-center items-center mt-4 fa-2x">
    <FontAwesomeIcon icon={faSpinner} spinPulse />
  </div>
  }
  return (
    <div>{merchantId}</div>
    // <MenuDishDetail></MenuDishDetail>
  );
}   

export default Menu;     