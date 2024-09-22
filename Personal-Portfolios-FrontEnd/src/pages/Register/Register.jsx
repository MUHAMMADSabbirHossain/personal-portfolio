import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { createEmailUser, updateUserProfile } = useContext(AuthContext);

    console.log(location);

    const handleRegister = (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        // console.log(form);

        const email = form.get("email");
        const password = form.get("password");
        const name = form.get("name");
        // console.log(email, password);

        // create user
        createEmailUser(email, password)
            .then(result => {
                console.log("user created: ", result.user);

                updateUserProfile(name)
                    .then(async data => {
                        // console.log(data); // why undefined

                        const user = {
                            email: result.user.email,
                            name: result.user.displayName,
                            // role: `member`
                        }
                        console.log(user);

                        const updateProfileRes = await axiosPublic.post(`/user`, user);
                        console.log("user profile update in DB: ", updateProfileRes);

                        if (updateProfileRes.data?.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your account have created and login successfully.",
                                showConfirmButton: false,
                                timer: 5500
                            });

                            navigate(location?.state ?
                                location.state :
                                "/");
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your account have already existed in DB.",
                                showConfirmButton: false,
                                timer: 5500
                            });
                        }

                        /* axiosPublic.post(`/user`, user)
                        .then(updateProfileRes=> {
                            console.log("user profile update in DB: ", updateProfileRes);

                            if (updateProfileRes.data?.insertedId) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your account have created and login successfully.",
                                    showConfirmButton: false,
                                    timer: 5500
                                });
                                console.log("1");
    
                                navigate(location?.state ?
                                    location.state :
                                    "/");
                            } else {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your account have already existed in DB.",
                                    showConfirmButton: false,
                                    timer: 5500
                                });
                                console.log("1");
    
                            }
                        }) */

                    }).catch((error) => {
                        console.error(error.message);

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: error.message, // account does't updated.
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            }).catch(error => {
                console.error(error.message);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: error.message, // accont does't created.
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Our project offers a <span className='font-bold'>microservices-based platform</span> to address user needs in resume building, web development, and community engagement.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="example@mail.com" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    <p className=' text-center my-2'>Already have any Account? <Link to="/login"><span className='text-blue-500 font-bold'>Login Here</span></Link>.</p>

                    <div className="divider">OR</div>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div >
    );
};

export default Register;