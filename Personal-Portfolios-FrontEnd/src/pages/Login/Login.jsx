import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { emailLogin } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        // console.log(form);

        const email = form.get("email");
        const password = form.get("password");
        // console.log(email, password);

        // signin with email and password
        emailLogin(email, password)
            .then(result => {
                // console.log(result.user);
                navigate(location?.state ?
                    location.state :
                    "/");
            })
            .catch(error => {
                // console.error(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Our project offers a <span className='font-bold'>microservices-based platform</span> to address user needs in resume building, web development, and community engagement.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    <p className='text-center my-2'>Don't have any Account? <Link state={location?.state} to="/register"><span className='text-blue-500 font-bold'>Register Here</span></Link>.</p>

                    <div className="divider">OR</div>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;