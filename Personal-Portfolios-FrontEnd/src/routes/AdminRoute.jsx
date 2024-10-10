import React from 'react';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {

    const { isAdmin } = useAdmin();
    console.log(isAdmin);

    // isAdmin?.admin ? {return children}: <></>
    if (isAdmin?.admin) {
        return children;
    } else {
        <></>
    }
};

export default AdminRoute;