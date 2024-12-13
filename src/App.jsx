import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SystemContextProvider } from "./context/SystemContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import LoginRegister from "./pages/LoginRegister";
import ForgetPassword from "./pages/ForgetPassword";
import Register from "./pages/Register";
const queryClient = new QueryClient();
const base_url = "/Order-Now-Frontend";
const router = createBrowserRouter([
    {
        path: `${base_url}/`,
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/cart`,
        element: <Cart />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/menu/:merchantId`,
        element: <Menu />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/menu/:merchantId/review`,
        element: <Review />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/auth/:authType`,
        element: <LoginRegister />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/auth/forgotPassword`,
        element: <ForgetPassword />,
        errorElement: <NotFound />,
    },
    {
        path: `${base_url}/Register`,
        element: <Register />,
        errorElement: <NotFound />,
    }
]);

function App() {
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
