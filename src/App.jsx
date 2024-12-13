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
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: "/cart",
        element: <Cart />,
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
