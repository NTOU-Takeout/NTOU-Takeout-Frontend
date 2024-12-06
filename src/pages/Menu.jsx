import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueries } from "@tanstack/react-query";
import MenuHeader from "../components/merchantPage/MenuHeader";
import MenuNavbar from "../components/merchantPage/MenuNavbar";
import MenuSection from "../components/merchantPage/MenuSection";
import useMerchantStore from "../stores/merchantStore";
import useAllDishStore from "../stores/allDishStore";
import useNavStore from "../stores/merchantMenuNav";
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
    const [menuId, setMenuId] = useState(null);
    const [merchant, setMerchant] = useState(null);

    // get merchant data
    useEffect(() => {
        const merchantData = getMerchantById(merchantId);
        if (merchantData) {
            setMerchant(merchantData);
            setMenuId(merchantData.menuId);
        } else { // if merchant data is not in store, fetch it
            const fetchMerchantData = async () => {
                try {
                    const res = await getStoreClient.getMerchantsByIdList([
                        merchantId,
                    ]);
                    setMerchant(res.data[0]);
                    console.debug("merchant data: ", res.data[0]);
                    setMenuId(res.data[0]?.menuId || null);
                } catch (error) {
                    console.error("Failed to fetch merchant data:", error);
                }
            };
            fetchMerchantData();
        }
    }, [merchantId, getMerchantById]);

    // Fetch menu category list and dish details
    const { data: menuCategoryList = [] } = useQuery({
        queryKey: ["menuCategoryList", menuId],
        queryFn: async () => {
            const res = await getMenuClient.getMenuByMenuId(menuId);
            const categories = res.data.categories;
            // Update navbar items
            setNavbarItems(categories.map((category) => category.first));
            return categories;
        },
        enabled: menuId != undefined,
        refetchOnWindowFocus: false,
    });

    // Fetch dish details for each category separately
    const categoryQueries = useQueries({
        queries: menuCategoryList.map((category) => ({
            queryKey: ["categoryDishes", merchantId, category.first],
            queryFn: async () => {
                console.debug("api param: ", merchantId, category.first);
                const dishDetails = await getMenuClient.getDishsByCategory(merchantId, category.first);
                console.debug("dishDetails: ", dishDetails);
                return {
                    categoryName: category.first,
                    dishes: dishDetails,
                };
            },
            enabled: menuId != undefined && !!category.second.length,
            refetchOnWindowFocus: false,
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
