import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useSidebarStore from "../../stores/common/sidebarStore";
import Header from "../../components/storePage/home/Header";
import NavbarSkeleton from "../../skeleton/menu/NavbarSkeleton";
import MenuSectionSkeleton from "../../skeleton/menu/MenuSectionSkeleton";
const MenuNavbar = lazy(
    () => import("../../components/merchantPage/MenuNavbar"),
);
const MenuSection = lazy(
    () => import("../../components/storePage/management/menu/MenuSection"),
);
import { useCategoryQueries } from "../../hooks/menu/useCategoryQueries";
import { useCategoryListQuery } from "../../hooks/menu/useCategoryListQuery";
import useMerchantStore from "../../stores/merchantStore";
import useNavStore from "../../stores/merchantMenuNav";
import getStoreClient from "../../api/store/getStoreClient";
import MenuPageSkeleton from "../../hooks/menu/MenuPageSkeleton";
import useMenuStore from "../../stores/menuStore";
import DishEdit from "../../components/storePage/management/menu/editPage/DishEdit";

const Menu = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const title = useSidebarStore((state) => state.title);
    const merchantId = "67178651994d5f6d435d6ef8";
    const onAddClick = () => {
        console.debug("add click");
    };
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
            // setIsNavbarFixed(scrollPosition > 260);
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
        } else {
            // if merchant data is not in store, fetch it
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

    const categoryData = useMenuStore((state) => state.menu);

    const menuCategoryList = useCategoryListQuery(menuId);
    //const { categoryData } = useCategoryQueries(menuCategoryList, merchantId);
    const [selectedDish, setSelectedDish] = useState(null);
    // set navbar items
    useEffect(() => {
        if (menuCategoryList?.length) {
            setNavbarItems(menuCategoryList.map((category) => category.first));
        }
    }, [menuCategoryList, setNavbarItems]);

    // if merchant data is not fetched yet, show loading spinner
    if (merchantId && !merchant) {
        return <MenuPageSkeleton />;
    }

    const addButton = (
        <button
            onClick={onAddClick}
            className="bg-orange-500 text-white rounded-lg p-2 flex  shadow-md"
        >
            <FontAwesomeIcon icon={faPlus} />
        </button>
    );
    const previewButton = (
        <button
            onClick={() => {
                console.debug("preview click");
            }}
            className=" bg-slate-400 text-white rounded-lg px-3 py-1 font-sm shadow-md"
        >
            預覽
        </button>
    );
    const handleUpdate = (newDish) => {
        console.log(newDish, "!!!");
        setSelectedDish(null);
    };
    if (selectedDish) {
        return (
            <DishEdit
                dishData={selectedDish}
                onClose={(dish) => handleUpdate(dish)}
            />
        );
    }

    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[addButton, previewButton]}
            />
            <div className="sticky top-[56px] z-20">
                <Suspense fallback={<NavbarSkeleton isNavbarFixed={false} />}>
                    <MenuNavbar
                        onNavClick={handleScrollToSection}
                        isNavbarFixed={isNavbarFixed}
                    />
                </Suspense>
            </div>
            <div className=" relative top-10">
                <Suspense fallback={<MenuSectionSkeleton />}>
                    <MenuSection
                        selectedDish={selectedDish}
                        setSelectedDish={setSelectedDish}
                        sectionRefs={sectionRefs}
                        categoryData={categoryData}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default Menu;
