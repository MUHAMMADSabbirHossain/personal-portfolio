import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Resume from "../pages/Resume";
import ComponentsUi from "../pages/ComponentsUi/ComponentsUi";
import ComponentsDoc from "../pages/ComponentsUi/ComponentsDoc/ComponentsDoc";
import Button from "../pages/ComponentsUi/ComponentsButton/ComponentsButton";
import ComponentsNavbar from "../pages/ComponentsUi/ComponentsNavbar/ComponentsNavbar";
import ComponentsTable from "../pages/ComponentsUi/ComponentsTable/ComponentsTable";

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
                element: <ComponentsUi></ComponentsUi>,
                children: [
                    {
                        path: "/components-ui/doc",
                        element: <ComponentsDoc></ComponentsDoc>
                    },
                    {
                        path: "/components-ui/button",
                        element: <Button></Button>
                    },
                    {
                        path: "/components-ui/table",
                        element: <ComponentsTable></ComponentsTable>
                    },
                    {
                        path: "/components-ui/navbar",
                        element: <ComponentsNavbar></ComponentsNavbar>
                    },
                ]
            },
            {
                path: "/about",
                element: <About></About>
            }
        ]
    }
])

export default router;