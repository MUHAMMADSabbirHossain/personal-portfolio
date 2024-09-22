import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // google login in
    const handleGoogleLogin = () => {
        console.log("GoogleLogin is clicked.");

        googleLogin()
            .then((result) => {
                console.log(result.user);
                console.log(location.state);
                navigate(location?.state ?
                    location.state :
                    "/"
                );
            })
            .catch((error) => {
                console.error(error.message);
            })
    }

    return (
        <div className="form-control my-6 mx-8">
            <button className="btn btn-primary" onClick={handleGoogleLogin}><FcGoogle className='text-3xl'></FcGoogle>Register in with Google</button>
        </div>
    );
};

export default SocialLogin;