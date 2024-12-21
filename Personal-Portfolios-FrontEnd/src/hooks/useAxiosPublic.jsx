import axios from "axios";

const instance = axios.create({
    baseURL: `https://personal-portfolios-backend.vercel.app/`,
    // baseURL: `http://localhost:5000/`,
});

const useAxiosPublic = () => {
    return (instance);
};

export default useAxiosPublic;