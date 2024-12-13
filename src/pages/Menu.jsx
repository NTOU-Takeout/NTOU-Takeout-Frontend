import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery";
import MenuHeader from "../components/merchantPage/MenuHeader";
import MenuNavbar from "../components/merchantPage/MenuNavbar";
import MenuSection from "../components/merchantPage/MenuSection";
import useMerchantStore from "../stores/merchantStore";
import useNavStore from "../stores/merchantMenuNav";
import getStoreClient from "../api/store/getStoreClient";
import ViewCartButton from "../components/merchantPage/ViewCartButton";

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const setNavbarItems = useNavStore((state) => state.setNavbarItems);

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
                    setMenuId(res.data[0]?.menuId || null);
                } catch (error) {
                    console.error("Failed to fetch merchant data:", error);
                }
            };
            fetchMerchantData();
        }
    }, [merchantId, getMerchantById]);

    const menuCategoryList = useCategoryListQuery(menuId);
    const { categoryData } = useCategoryQueries(menuCategoryList, merchantId);
    const [selectedDish, setSelectedDish] = useState(null);
    // set navbar items
    useEffect(() => {
        if (menuCategoryList?.length) {
            setNavbarItems(menuCategoryList.map((category) => category.first));
        }
    }, [menuCategoryList, setNavbarItems]);

    // if merchant data is not fetched yet, show loading spinner
    if (merchantId && !merchant) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
        );
    }
    return (
        <div>
            <MenuHeader merchantData={merchant} />
            <MenuNavbar
                onNavClick={handleScrollToSection}
                isNavbarFixed={isNavbarFixed}
            />
            {categoryData.length ? (
                <MenuSection
                    selectedDish={selectedDish}
                    setSelectedDish={setSelectedDish}
                    sectionRefs={sectionRefs}
                    categoryData={categoryData}
                />
            ) : (
                <div className="flex justify-center items-center mt-4 fa-2x">
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
            )}
            {selectedDish == null && (
                <ViewCartButton />
            )}
        </div>
    )
}

export default Menu;
