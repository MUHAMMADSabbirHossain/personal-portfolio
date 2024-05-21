import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Resume from "../pages/Resume";
import ComponentsUi from "../pages/ComponentsUi";

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
                path: "/components-ui",
                element: <ComponentsUi></ComponentsUi>
            },
            {
                path: "/about",
                element: <About></About>
            }
        ]
    }
])

export default router;