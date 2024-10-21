import { StrictMode } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        // errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId",
        element: <Menu />,
    }
]);

function App() {
    return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
    
    )
}
export default App;