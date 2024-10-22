import React from 'react';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Review from './pages/Review';
import NotFound from './pages/NotFound';
import ScrollToTop from './pages/utils/ScrollToTop';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/menu/:merchantId",
        element: <Menu />,
    },
    {
        path: "/menu/:merchantId/review",
        element: <Review />,
    },
]);

function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}>
                    <ScrollToTop />
                </RouterProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
