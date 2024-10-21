import Home from './pages/Home';
import Menu from './pages/Menu';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
]);

function App() {
    return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
    
    )
}
export default App;