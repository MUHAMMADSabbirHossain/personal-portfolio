import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Resume from "../pages/Resume/Resume";
import ComponentsUi from "../pages/ComponentsUi/ComponentsUi";
import ComponentsDoc from "../pages/ComponentsUi/ComponentsDoc/ComponentsDoc";
import Button from "../pages/ComponentsUi/ComponentsButton/ComponentsButton";
import ComponentsNavbar from "../pages/ComponentsUi/ComponentsNavbar/ComponentsNavbar";
import ComponentsTable from "../pages/ComponentsUi/ComponentsTable/ComponentsTable";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashBoard from "../pages/DashBoard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import Volunteering from "../pages/Volunteering/Volunteering";
import Donation from "../pages/Donation/Donation";
import DashboardUserHome from "../pages/DashBoard/DashboardUserHome/DashboardUserHome";
import DashboardAdminHome from "../pages/DashBoard/DashboardAdminHome/DashboardAdminHome";
import AddVolunteering from "../pages/DashBoard/AddVolunteering/AddVolunteering";
import AddDonation from "../pages/DashBoard/ManageDonation/AddDonation/AddDonation";
import UpdateVolunteering from "../pages/DashBoard/UpdateVolunteering/UpdateVolunteering";
import UpdateDonation from "../pages/DashBoard/ManageDonation/UpdateDonation/UpdateDonation";
import ManageDonation from "../pages/DashBoard/ManageDonation/ManageDonation";
import ManageVolunteering from "../pages/DashBoard/ManageVolunteering/ManageVolunteering";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Bookmarked from "../pages/DashBoard/Bookmarked/Bookmarked";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";

const axiosPublic = useAxiosPublic();
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
                path: "/volunteering",
                element: <Volunteering></Volunteering>,
                loader: async () => {
                    const res = await axiosPublic.get("/volunteerings");
                    return res.data;
                }
            },
            {
                path: "/donation",
                element: <Donation></Donation>,
                loader: async () => {
                    const res = await axiosPublic.get("/donations");
                    return res.data;
                },
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
                children: [
                    /* user dashboard */
                    {
                        path: "/dashboard/userHome",
                        element: <DashboardUserHome></DashboardUserHome>
                    },
                    {
                        path: "/dashboard/bookmarked",
                        element: <Bookmarked></Bookmarked>
                    },

                    /* admin dashboard */
                    {
                        path: "/dashboard/adminHome",
                        element: <DashboardAdminHome></DashboardAdminHome>
                    },
                    {
                        path: "/dashboard/manageVolunteering",
                        element: <ManageVolunteering></ManageVolunteering>,
                        loader: async () => {
                            const res = await axiosPublic.get("/volunteerings");
                            return res.data;
                        },
                        children: []
                    },
                    {
                        path: "/dashboard/manageVolunteering/addVolunteering",
                        element: <AddVolunteering></AddVolunteering>
                    },
                    {
                        path: "/dashboard/manageVolunteering/updateVolunteering/:id",
                        element: <UpdateVolunteering></UpdateVolunteering>
                    },
                    {
                        path: "/dashboard/manageDonation",
                        element: <ManageDonation></ManageDonation>,
                        loader: async () => {
                            const res = await axiosPublic.get("/donations");
                            return res.data;
                        },
                        children: []
                    },
                    {
                        path: "/dashboard/manageDonation/addDonation",
                        element: <AddDonation></AddDonation>
                    },
                    {
                        path: "/dashboard/manageDonation/updateDonation/:id",
                        element: <UpdateDonation></UpdateDonation>
                    },
                    {
                        path: "/dashboard/allUsers",
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: "/dashboard/payment",
                        element: <Payment></Payment>
                    },
                    {
                        path: "/dashboard/paymentHistory",
                        element: <PaymentHistory></PaymentHistory>
                    },
                ]
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