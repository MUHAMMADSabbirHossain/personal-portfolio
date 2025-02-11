import React from 'react';
import { NavLink } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import AdminRoute from '../../../routes/AdminRoute';

const DashboardNavbar = () => {

    const { isAdmin } = useAdmin();
    // console.log(isAdmin);

    const dashboardNavbarList = <>
        {/* <li><a>Item 1</a></li>
        <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li>
        <li><a>Item 3</a></li> */}

        {/* regular user panel */}
        <li><NavLink to="/dashboard/userHome">userHome</NavLink></li>
        <li><NavLink to="/dashboard/bookmarked">bookmarked</NavLink></li>
        <li><NavLink to="/dashboard/paymentHistory">paymentHistory</NavLink></li>

        {/* addmin users panel */}
        <AdminRoute>
            <li><NavLink to="/dashboard/adminHome">adminHome</NavLink></li>
            <li><NavLink to="/dashboard/manageVolunteering">manageVolunteering</NavLink></li>
            <li><NavLink to="/dashboard/manageDonation">manageDonation</NavLink></li>
            <li><NavLink to="/dashboard/allUsers">allUsers</NavLink></li>
        </AdminRoute>
    </>

    return (
        <div>
            {/* <h2 className='text-center'>Dashboad Navbar...</h2> */}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li> */}
                            {
                                dashboardNavbarList
                            }
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li> */}
                        {
                            dashboardNavbarList
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <a className="btn">Button</a> */}
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;