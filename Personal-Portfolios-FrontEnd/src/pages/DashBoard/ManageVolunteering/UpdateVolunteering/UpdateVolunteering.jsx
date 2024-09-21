import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateVolunteering = () => {

    const axiosPublic = useAxiosPublic();
    const param = useParams();
    console.log(param);
    const [selectedVolunteering, setSelectedVolunteering] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await axiosPublic.get(`/volunteering/${param.id}`);
            console.log(res.data);
            setSelectedVolunteering(res.data);
        })();

    }, []);

    console.log(selectedVolunteering);

    const handleUpdateVolunteering = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const category = event.target.category.value;
        const address = event.target.address.value;
        const photoUrl = event.target.photoUrl.value;
        const details = event.target.details.value;

        const updatedVolunteering = {
            title,
            category,
            address,
            photoUrl,
            details
        }
        console.log(updatedVolunteering);

        const res = await axiosPublic.patch(`/volunteering/${selectedVolunteering._id}`, updatedVolunteering);
        console.log(res.data);

        if (res.data.modifiedCount === 1) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your volunteering item is updated successfully.",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("modifiedCount: ", res.data.modifiedCount);

            navigate("/dashboard/manageVolunteering");
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something worng! Try Again.",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("modifiedCount: ", res.data.modifiedCount);
        }
    }

    return (
        <div>
            <h2 className='text-center'>Update Volunteering...</h2>

            <div className="min-h-screen bg-base-200 rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdateVolunteering} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="" defaultValue={selectedVolunteering.title} className="input input-bordered" />
                            </div>

                            <div className='grid sm:grid-cols-2 gap-5'>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select name='category' className="select select-bordered" defaultValue={selectedVolunteering.category}>
                                        <option disabled value="default">Select one</option>
                                        <option value="cleanDrinkingWater">Clean Drinking Water</option>
                                        <option value="cleanDrinkingWater">Basic Education</option>
                                        <option value="cleanDrinkingWater">Animals Care</option>
                                        <option value="cleanDrinkingWater">Arts and Culture</option>
                                        <option value="cleanDrinkingWater">Save Homelessness</option>
                                        <option value="cleanDrinkingWater">Refuge Support</option>
                                        <option value="cleanDrinkingWater">Health Care</option>
                                        <option value="cleanDrinkingWater">Autism Awarness</option>
                                        <option value="cleanDrinkingWater">Floo Donation</option>
                                        <option value="cleanDrinkingWater">Earthquake Donation</option>
                                        <option value="cleanDrinkingWater">Energy Providing</option>
                                        <option value="cleanDrinkingWater">Traffic Donation</option>
                                    </select>
                                </label>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" name='address' placeholder="" defaultValue={selectedVolunteering.address} className="input input-bordered" />
                                </div>
                            </div>


                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo</span>
                                </div>
                                <input name='photoUrl' type="file" defaultValue={selectedVolunteering.photoUrl} className="file-input file-input-bordered w-full max-w-xs" />
                            </label>

                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                            </div> */}

                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Details</span>
                                </div>
                                <textarea name='details' className="textarea textarea-bordered h-24" placeholder="Write details about the volunteering..." defaultValue={selectedVolunteering.details}></textarea>
                            </label>

                            <div className="form-control mt-6">
                                {/* <button className="btn btn-primary">Add Donation</button> */}
                                <input className="btn btn-primary" type="submit" value="Update Volunteering" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateVolunteering;