import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
import useDonationBookmarked from "../hooks/useDonationBookmarked";
import { FaBookmark } from "react-icons/fa6";

const Navbar = () => {

    const { donationBookmarked, donationBookmarkedTotalAmount } = useDonationBookmarked();
    const { user, logout } = useContext(AuthContext);

    const linkList = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/resume">Resume</NavLink></li>
        <li><NavLink to="/components-ui">ComponentsUI</NavLink></li>
        <li><NavLink to="/volunteering">Volunteering</NavLink></li>
        <li><NavLink to="/donation">Donation</NavLink></li>
        {user?.email ?
            <li><NavLink to="/dashboard">DashBoard</NavLink></li> : <></>
        }
        <li><NavLink to="/about">About</NavLink></li>
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
    </>;

    const handleLogout = () => {
        logout()
            .then(() => {
                // console.log("Logout successfully");
            })
            .catch(error => {
                // console.error(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/*    <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li> */}
                        {linkList}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">Micro_Services</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/*  <li><a>Item 1</a></li>
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
                    {linkList}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FaBookmark className="text-2xl" />
                                <span className="badge badge-sm indicator-item">+{donationBookmarked.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{donationBookmarked.length} bookmarked</span>
                                <span className="text-info">Subtotal: ${donationBookmarkedTotalAmount}</span>
                                <div className="card-actions">
                                    <Link to={`dashboard/bookmarked`} className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            {/* <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div> */}
                            <FaUserAlt className="text-2xl" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li>
                                {
                                    user
                                        ? <button onClick={handleLogout} className="btn">Logout</button>
                                        : <Link to="/login" className="btn">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;