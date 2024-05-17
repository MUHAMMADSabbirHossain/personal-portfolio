import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Resume from "../pages/Resume";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/resume",
                element: <Resume></Resume>
            },
            {
                path: "/about",
                element: <About></About>
            }
        ]
    }
])

export default router;