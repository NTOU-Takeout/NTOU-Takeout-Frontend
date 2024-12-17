import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemContextProvider } from "./context/SystemContext";
import NotFound from "./pages/NotFound";
import CartSkeleton from "./skeleton/cart/CartSkeleton";
import HomeSkeleton from "./skeleton/home/HomeSkeleton";
import ReviewSkeleton from "./skeleton/review/ReviewSkeleton";
import MenuPageSkeleton from "./hooks/menu/MenuPageSkeleton";
import LoginRegisterSkeleton from "./skeleton/auth/LoginRegisterSkeleton";
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Review = lazy(() => import("./pages/Review"));
const Menu = lazy(() => import("./pages/Menu"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Register = lazy(() => import("./pages/Register"));
const MerchantRegister = lazy(() => import("./pages/MerchantRegister"));
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<HomeSkeleton />}><Home /></Suspense>,
        errorElement: <NotFound />,
    },
    {
        path: "/cart",
        element: <Suspense fallback={<CartSkeleton />}><Cart /></Suspense>,
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId",
        element: <Suspense fallback={<MenuPageSkeleton />}><Menu /></Suspense>,
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId/review",
        element: <Suspense fallback={<ReviewSkeleton />}><Review /></Suspense>,
        errorElement: <NotFound />,
    },
    {
        path: "/auth/:authType",
        element: <Suspense fallback={<LoginRegisterSkeleton />}><LoginRegister /></Suspense>,
        errorElement: <NotFound />,
    },
    {
        path: "/auth/forgotPassword",
        element: <ForgetPassword />,
        // errorElement: <NotFound />,
    },
    {
        path: "/Register",
        element: <Register />,
        errorElement: <NotFound />,
    },
    {
        path: "/auth/merchant/register",
        element: <MerchantRegister />,
        // errorElement: <NotFound />,
    }

],
    {
        basename: "/Order-Now-Frontend/",
    }
);

function App() {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get('redirect');
        if (redirectPath) {
            router.navigate(redirectPath, { replace: true });
        }
    }, []);
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <SystemContextProvider>
                    <RouterProvider router={router}></RouterProvider>
                </SystemContextProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
