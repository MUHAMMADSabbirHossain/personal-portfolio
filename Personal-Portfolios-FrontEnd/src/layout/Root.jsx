import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Root = () => {
    return (
        <>root
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Root;