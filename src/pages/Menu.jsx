import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import MenuHeader from '../components/merchantPage/MenuHeader';
import MenuNavbar from '../components/merchantPage/MenuNavbar';
import MenuSectionPage from '../components/merchantPage/MenuSectionPage';

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false); // 取消動畫
        }, 100); // 設定持續時間與 CSS 動畫一致

        return () => clearTimeout(timer);
    }, []);
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
        queryKey: ['menuCategoryList'],
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
        <div className={`transition-transform duration-100 ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
            <MenuHeader merchantId={merchantId} />  {/* 傳遞 merchantId */}
            <MenuNavbar onNavClick={handleScrollToSection} isNavbarFixed={isNavbarFixed} />
            <MenuSectionPage sectionRefs={sectionRefs} />
        </div>
    );
}

export default Menu;
