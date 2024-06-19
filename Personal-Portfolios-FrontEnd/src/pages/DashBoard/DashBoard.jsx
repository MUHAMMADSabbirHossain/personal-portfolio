import React from 'react';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div >
            <DashboardNavbar></DashboardNavbar>

            {/* <p className='text-center'>DashBoard...</p> */}

            <Outlet></Outlet>

            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Make sure before you change anything.</p>
                </aside>
            </footer>
        </div>
    );
};

export default DashBoard;