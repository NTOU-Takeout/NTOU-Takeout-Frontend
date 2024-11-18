import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";
import LoginRegister from "./pages/LoginRegister";
import Register from "./pages/Register";
import ForgetPasswd from "./pages/ForgetPasswd";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
        path: "/loginRegister",
        element: <LoginRegister />,
        // errorElement: <NotFound />,
    },
    {
        path: "/register",
        element: <Register />,
        // errorElement: <NotFound />,
    },
    {
        path: "/forgetPasswd",
        element: <ForgetPasswd />,
        // errorElement: <NotFound />,
    },
]);

function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
