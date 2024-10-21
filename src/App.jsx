import Home from './pages/Home';
import Menu from './pages/Menu';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import NotFound from './pages/NotFound';

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
        <RouterProvider router={router} />
    </React.StrictMode>
    
    )
}
export default App;