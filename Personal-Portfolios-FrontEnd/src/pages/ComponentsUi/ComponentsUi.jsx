import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const ComponentsUi = () => {
    return (
        <section className='grid grid-cols-5'>
            <section>
                <nav className='flex flex-col'>
                    <NavLink to="/components-ui/doc">Documentaion</NavLink>
                    <NavLink to="/components-ui/button">Button</NavLink>
                    <NavLink to="/components-ui/navbar">Navbar</NavLink>
                </nav>
            </section>

            <section className='col-span-3 border'>
                <Outlet></Outlet>
            </section>

            <aside className=''>aside</aside>
        </section>
    );
};

export default ComponentsUi;