import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    // google login in
    const handleGoogleLogin = () => {
        // console.log("GoogleLogin is clicked.");

        googleLogin()
            .then(async (result) => {
                // console.log(result.user);

                const user = {
                    email: result.user.email,
                    name: result.user.displayName,
                    role: "member"
                }
                // console.log(user);

                const res = await axiosPublic.post(`/user`, user);
                // console.log(res.data);

                if (res.data?.insertedId
                ) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your account have created and login successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your account have already existed and login successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                // console.log(location.state);
                navigate(location?.state ?
                    location.state :
                    "/"
                );
            })
            .catch((error) => {
                // console.error(error.message);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="form-control my-6 mx-8">
            <button className="btn btn-primary" onClick={handleGoogleLogin}><FcGoogle className='text-3xl'></FcGoogle>Register in with Google</button>
        </div>
    );
};

export default SocialLogin;