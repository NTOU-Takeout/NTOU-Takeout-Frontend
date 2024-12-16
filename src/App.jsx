import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DevToolBubble from "./devtool/DevToolBubble";
import { SystemContextProvider } from "./context/SystemContext";
import NotFound from "./pages/NotFound";
import CartSkeleton from "./skeleton/cart/CartSkeleton";
import HomeSkeleton from "./skeleton/home/HomeSkeleton";
import ReviewSkeleton from "./skeleton/review/ReviewSkeleton";
import MenuPageSkeleton from "./hooks/menu/MenuPageSkeleton";
import LoginRegisterSkeleton from "./skeleton/auth/LoginRegisterSkeleton";
import MerchantSkeleton from "./skeleton/merchant/MerchantSkeleton";
import MerchantPage from "./pages/MerchantPage";
import MerchantMainPage from "./pages/MerchantSubpage/MerchantMainPage";
import MerchantMenuPage from "./pages/MerchantSubpage/MerchantMenuPage";
import MerchantOrderPage from "./pages/MerchantSubpage/MerchantOrderPage";

const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Review = lazy(() => import("./pages/Review"));
const Menu = lazy(() => import("./pages/Menu"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Register = lazy(() => import("./pages/Register"));
const StoreHome = lazy(() => import("./pages/store/Home"));
const StoreMenu = lazy(() => import("./pages/store/Menu"));
const merchantPage = lazy(() => import("./pages/MerchantPage"));
const queryClient = new QueryClient();

const router = createBrowserRouter(
    [
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
            path: "/auth/forgotPassword",
            element: <ForgetPassword />,
            errorElement: <NotFound />,
        },
        {
            path: "/Register",
            element: <Register />,
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
            ],
        },
        {
            path: "/merchantPage",
            element: <MerchantPage />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "", // 子路由
                    element: <MerchantMainPage />,
                    errorElement: <NotFound />,
                },
                {
                    path: "menu", // 子路由
                    element: <MerchantMenuPage />,
                    errorElement: <NotFound />,
                },
                {
                    path: "order", // 子路由
                    element: <MerchantOrderPage />,
                    errorElement: <NotFound />,
                },
            ],
        },
        // {
        //     path: "/merchantPage",
        //     element: <MerchantPage />,
        //     errorElement: <NotFound />,
        //     children: [
        //         {
        //             path: "", // 子路由
        //             element: <MerchantMainPage />,
        //             errorElement: <NotFound />,
        //         },
        //         {
        //             path: "menu", // 子路由
        //             element: <MerchantMenuPage />,
        //             errorElement: <NotFound />,
        //         },
        //         {
        //             path: "order", // 子路由
        //             element: <MerchantOrderPage />,
        //             errorElement: <NotFound />,
        //         },
        //     ],
        // }
    ],
    {
        basename: "/Order-Now-Frontend/",
    },
);

function App() {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect");
        if (redirectPath) {
            router.navigate(redirectPath, { replace: true });
        }
    }, []);
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <SystemContextProvider>
                    <RouterProvider router={router}></RouterProvider>
                    <DevToolBubble
                        router={router}
                        endPointReplacements={{
                            merchantId: "67178651994d5f6d435d6ef8",
                            authType: "login",
                            storeId: "67178651994d5f6d435d6ef8",
                        }}
                    />
                </SystemContextProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
