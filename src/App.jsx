import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SystemContextProvider } from "./context/SystemContext";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";
import LoginRegister from "./pages/LoginRegister";
import ForgetPassword from "./pages/ForgetPassword";
import Register from "./pages/Register";
import CartSkeleton from "./skeleton/cart/CartSkeleton";
import HomeSkeleton from "./skeleton/home/HomeSkeleton";
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
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
        element: <Menu />,
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId/review",
        element: <Review />,
        errorElement: <NotFound />,
    },
    {
        path: "/auth/:authType",
        element: <LoginRegister />,
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
    }],
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
