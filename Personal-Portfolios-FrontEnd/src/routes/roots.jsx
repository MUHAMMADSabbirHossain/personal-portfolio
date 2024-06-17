import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Resume from "../pages/Resume";
import ComponentsUi from "../pages/ComponentsUi/ComponentsUi";
import ComponentsDoc from "../pages/ComponentsUi/ComponentsDoc/ComponentsDoc";
import Button from "../pages/ComponentsUi/ComponentsButton/ComponentsButton";
import ComponentsNavbar from "../pages/ComponentsUi/ComponentsNavbar/ComponentsNavbar";
import ComponentsTable from "../pages/ComponentsUi/ComponentsTable/ComponentsTable";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashBoard from "../pages/DashBoard/DashBoard";
import PrivateRoute from "./PrivateRoute";

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
                path: "/dashboard",
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    }
])

export default router;