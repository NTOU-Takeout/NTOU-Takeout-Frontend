import { useEffect, useState, useRef } from 'react';
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
  const [categoryData, setCategoryData] = useState([]); //for all menu data
  useEffect(() => {
    const merchantData = getMerchantById(merchantId);
    if (merchantData) {
      setMerchant(merchantData);
      setMenuId(merchantData.menuId);
    } else { // Fetch merchant data if not in store
      const fetchMerchantData = async () => {
        try {
          const [data] = await getStoreClient.getMerchantsByIdList([merchantId]);
          setMerchant(data);
          setMenuId(data?.menuId || null);
        } catch (error) {
          console.error("Failed to fetch merchant data:", error);
        }
      };
      fetchMerchantData();
    }
  }, [merchantId, getMerchantById]);

  useEffect(() => {
    console.log("menuId:", menuId);
  }, [menuId]);

  //Fetch menu category list and dish details
  const { 
    data: menuCategoryList,
    isSuccess: isMenuCategoryListSuccess,
  } = useQuery({
    queryKey: ['menuCategoryList', menuId],
    queryFn: async () => {
      if (!menuId) return [];
      const data = await getMenuClient.getMenuByMenuId(menuId);
      return data.categories;
    },
    enabled: !!menuId,
  });

  const { data  } = useQuery({
    queryKey: ['menuCategoryData'],
    queryFn: async () => {
      const dishIds = menuCategoryList.flatMap((category) => category.second);
        try {
          const dishDetails = await getMenuClient.getDishsByDishIds(dishIds); 
          console.log("dishDetails:", dishDetails);
          const categorizedData = menuCategoryList.map((category) => ({
            categoryName: category.first,
            dishes: category.second.map((id) =>
              dishDetails.find((dish) => dish.id === id)
            ),
          }));

          setCategoryData(categorizedData); 
          return dishIds;
        } catch (error) {
          console.error("Failed to fetch dish details:", error);
        }
    },
    enabled: !isMenuCategoryListSuccess,
  });

  useEffect(() => {
    console.log("categoryData:", categoryData);
  }, [categoryData]);

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