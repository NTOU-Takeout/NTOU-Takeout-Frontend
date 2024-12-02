import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueries } from "@tanstack/react-query";
import MenuHeader from "../components/merchantPage/MenuHeader";
import MenuNavbar from "../components/merchantPage/MenuNavbar";
import MenuSection from "../components/merchantPage/MenuSection";
import useMerchantStore from "../stores/merchantStore";
import useNavStore from "../stores/merchantMenuNav";
import useAllDishStore from "../stores/allDishesStore";
import getStoreClient from "../api/store/getStoreClient";
import getMenuClient from "../api/menu/getMenuClient";

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const setNavbarItems = useNavStore((state) => state.setNavbarItems);
    const setDishes = useAllDishStore((state) => state.setDishes);

    // handle scroll to section
    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "start",
        });
    };

    // listen for dertermine if navbar is fixed
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsNavbarFixed(scrollPosition > 260);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const getMerchantById = useMerchantStore((state) => state.getMerchantById);
    // const [menuId, setMenuId] = useState(null);
    const [merchant, setMerchant] = useState(null);

    // get merchant data
    useEffect(() => {
        const merchantData = getMerchantById(merchantId);
        if (merchantData) {
            setMerchant(merchantData);
            // setMenuId(merchantData.menuId);
        } else {
            const fetchMerchantData = async () => {
                try {
                    const data = await getStoreClient.getMerchantsByIdList([
                        merchantId,
                    ]);
                    setMerchant(data[0]);
                    // setMenuId(data[0]?.menuId || null);
                } catch (error) {
                    console.error("Failed to fetch merchant data:", error);
                }
            };
            fetchMerchantData();
        }
    }, [merchantId, getMerchantById]);

    // Fetch menu category list and dish details
    const { data: menuCategoryList = [] } = useQuery({
        queryKey: ["menuCategoryList" + merchantId],
        queryFn: async () => {
            if (!merchantId) return [];
            const data = await getMenuClient.getMenuByMenuId(merchantId);
            // Update navbar items
            setNavbarItems(data.categories.map((category) => category.first));
            console.log("menuCategoryList:", data.categories);
            return data.categories;
        },
        enabled: !!merchantId,
    });

    // Fetch dish details for each category separately
    const categoryQueries = useQueries({
        queries: menuCategoryList.map((category) => ({
            queryKey: ["categoryDishes" + merchantId + category.first],
            queryFn: async () => {
                // const dishIds = category.second;
                const dishDetails =
                    await getMenuClient.getDishsByDishIds(merchantId, category.first);
                return {
                    categoryName: category.first,
                    dishes: dishDetails,
                };
            },
            enabled: !!merchantId && !!category.second.length,
        })),
    });
    useEffect(() => {
        categoryQueries.forEach((query) => {
            if (query.isSuccess && query.data) {
                // save dishes' data to allDishStore
                const dishesToStore = query.data.dishes.reduce((acc, dish) => {
                    acc[dish.id] = dish;
                    return acc;
                }, {});
                setDishes(dishesToStore);
            }
        });
    }, [categoryQueries, setDishes]);

    // Transform the queries results into categoryData
    const categoryData = categoryQueries
        .map((query) => query.data)
        .filter(Boolean); // Filter out undefined results
    console.log(categoryData);
    
    return merchant && merchantId ? (
        <div>
            <MenuHeader merchantData={merchant} />
            <MenuNavbar
                onNavClick={handleScrollToSection}
                isNavbarFixed={isNavbarFixed}
            />
            {categoryData.length ? (
                <MenuSection
                    sectionRefs={sectionRefs}
                    categoryData={categoryData}
                />
            ) : (
                <div className="flex justify-center items-center mt-4 fa-2x">
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
            )}
        </div>
    ) : (
        <div className="flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
    );
}

export default Menu;
