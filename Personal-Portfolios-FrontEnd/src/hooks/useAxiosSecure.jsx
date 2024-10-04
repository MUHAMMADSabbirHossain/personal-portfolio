import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import Swal from "sweetalert2";

const instance = axios.create({
    baseURL: `http://localhost:5000/`
});

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    // request interceptor to add authorization header for every secure api
    instance.interceptors.request.use(async (config) => {
        console.log(`request stoped by interceptor: `, config);

        const jwtToken = localStorage.getItem(`access-token`)

        config.headers.authorization = `Bearer ${jwtToken}`

        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    instance.interceptors.response.use(async (response) => {
        return response;
    }, async (error) => {
        console.log(`status error in the interceptor: `, error);

        const status = error.response.status;
        // logout user for 401 nd 403 error.
        if (status === 401 || status === 403) {

            await logout();

            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 2500
            });

            navigate(`/login`);
        }

        return Promise.reject(error);
    })

    return (instance);
};

export default useAxiosSecure;