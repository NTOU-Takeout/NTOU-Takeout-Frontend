import {lazy, Suspense } from "react";
import NotFound from "../pages/NotFound";
import CartSkeleton from "../skeleton/cart/CartSkeleton";
import HomeSkeleton from "../skeleton/home/HomeSkeleton";
import ReviewSkeleton from "../skeleton/review/ReviewSkeleton";
import MenuPageSkeleton from "../hooks/menu/MenuPageSkeleton";
import LoginRegisterSkeleton from "../skeleton/auth/LoginRegisterSkeleton";
const Cart = lazy(() => import("../pages/Cart"));
const Home = lazy(() => import("../pages/Home"));
const Review = lazy(() => import("../pages/Review"));
const Menu = lazy(() => import("../pages/Menu"));
const LoginRegister = lazy(() => import("../pages/LoginRegister"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const Verify = lazy(() => import("../pages/Verify.jsx"));
const MerchantRegister = lazy(() => import("../pages/MerchantRegister"));
const StoreHome = lazy(() => import("../pages/store/Home"));
const StoreMenu = lazy(() => import("../pages/store/Menu"));
const StoreOrder = lazy(() => import("../pages/store/Order"));
import OrderDetails from "../pages/store/OrderDetailPage";
export const routesConfig = [
    {
        path: "/",
        element: (
            <Suspense fallback={<HomeSkeleton />}>
                <Home />
            </Suspense>
        ),
        errorElement: <NotFound />,

    },
    {
        path: "/cart",
        element: (
            <Suspense fallback={<CartSkeleton />}>
                <Cart />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId",
        element: (
            <Suspense fallback={<MenuPageSkeleton />}>
                <Menu />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId/review",
        element: (
            <Suspense fallback={<ReviewSkeleton />}>
                <Review />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/auth/:authType",
        element: (
            <Suspense fallback={<LoginRegisterSkeleton />}>
                <LoginRegister />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/auth/reset/password",
        element: (
            <Suspense fallback={LoginRegisterSkeleton}>
                <ForgetPassword />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/auth/Verify",
        element: (
            <Suspense fallback={LoginRegisterSkeleton}>
                <Verify />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/auth/register/merchant",
        element: (
            <Suspense fallback={LoginRegisterSkeleton}>
                <MerchantRegister />
            </Suspense>
        ),
        errorElement: <NotFound />,
    },
    {
        path: "/store/:storeId",
        element: (
            <Suspense fallback={<HomeSkeleton />}>
                <StoreHome />
            </Suspense>
        ),
        errorElement: <NotFound />,
        children: [
            {
                path: "management/menu",
                element: (
                    <Suspense fallback={<MenuPageSkeleton />}>
                        <StoreMenu />
                    </Suspense>
                ),
                errorElement: <NotFound />,
            },
            {
                path: "management/order",
                element: (
                    <Suspense fallback={<MenuPageSkeleton />}>
                        <StoreOrder />
                    </Suspense>
                ),
                errorElement: <NotFound />,
            },
        ],
    },
    {
        path: "/OrderDetails",
        element: <OrderDetails />,
        errorElement: <NotFound />,
    },
];



