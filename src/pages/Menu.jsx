import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import MenuHeader from '../components/merchantPage/MenuHeader';
import MenuNavbar from '../components/merchantPage/MenuNavbar';
import MenuSectionPage from '../components/merchantPage/MenuSectionPage';
import useMerchantStore from '../stores/merchantStore';
import useNavStore from '../stores/merchantMenuNav';  // 引入 nav store
import getStoreClient from '../api/store/getStoreClient';
import getMenuClient from '../api/menu/getMenuClient';

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    
    // 使用 nav store
    const setNavbarItems = useNavStore((state) => state.setNavbarItems); 

    // 處理滾動到對應的部分
    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    // 監控滾動事件，更新 isNavbarFixed 狀態
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsNavbarFixed(scrollPosition > 200);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 取消動畫的延遲
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const getMerchantById = useMerchantStore((state) => state.getMerchantById);
    const [menuId, setMenuId] = useState(null);
    const [merchant, setMerchant] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    // 獲取商家資料
    useEffect(() => {
        const merchantData = getMerchantById(merchantId);
        if (merchantData) {
            setMerchant(merchantData);
            setMenuId(merchantData.menuId);
        } else {
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

    // Fetch menu category list and dish details
    const { data: menuCategoryList, isSuccess: isMenuCategoryListSuccess } = useQuery({
        queryKey: ['menuCategoryList'+menuId], // 與 menuId 關聯
        queryFn: async () => {
            if (!menuId) return [];
            const data = await getMenuClient.getMenuByMenuId(menuId);
            return data.categories;
        },
        enabled: !!menuId, // 當 menuId 存在時才啟動查詢
    });

    // 獲取菜品詳細資料
    const { data } = useQuery({
        queryKey: ['menuCategoryData', menuId, menuCategoryList], // 關聯 menuId 和 menuCategoryList
        queryFn: async () => {
            if (!menuCategoryList || menuCategoryList.length === 0) return [];
            const dishIds = menuCategoryList.flatMap((category) => category.second);
            try {
                const dishDetails = await getMenuClient.getDishsByDishIds(dishIds);
                const categorizedData = menuCategoryList.map((category) => ({
                    categoryName: category.first,
                    dishes: category.second.map((id) => dishDetails.find((dish) => dish.id === id)),
                }));

                setCategoryData(categorizedData); 

                // 更新 navbarItems 到 navstore
                setNavbarItems(menuCategoryList.map(category => category.first)); 

                return dishIds;
            } catch (error) {
                console.error("Failed to fetch dish details:", error);
            }
        },
        enabled: isMenuCategoryListSuccess && menuCategoryList?.length > 0, // 在成功獲取 menuCategoryList 且 menuId 有效時啟用
    });

    // Debug 確認 categoryData
    useEffect(() => {
        console.log("categoryData:", categoryData);
    }, [categoryData]);

    if (!merchant) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
        );
    }
    return (
        <div>
            <MenuHeader 
                title={merchant.name} // 使用商家名稱
                distance={merchant.distance || 0} // 使用商家距離
                averageCost={merchant.averageSpend || 0} // 使用商家平均花費
                rating={merchant.rating || 0} // 使用商家評級
                reviews={merchant.reviewIdList || 0} // 使用商家評論數
                bannerLink={merchant.picture} // 使用商家橫幅圖片鏈接
                merchantId={merchantId} // 傳遞 merchantId
            />
            <MenuNavbar onNavClick={handleScrollToSection} isNavbarFixed={isNavbarFixed} />
            <MenuSectionPage sectionRefs={sectionRefs} categoryData={categoryData} /> {/* 傳遞 categoryData */}
        </div>
    );
}

export default Menu;
