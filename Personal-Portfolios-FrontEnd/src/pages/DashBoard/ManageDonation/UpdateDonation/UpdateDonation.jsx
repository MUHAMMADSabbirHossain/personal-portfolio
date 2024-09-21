import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateDonation = () => {

    const param = useParams();
    console.log(param.id);
    const axiosPublic = useAxiosPublic();
    const [selectedDonation, setSelectedDonation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await axiosPublic.get(`/donation/${param.id}`);
            console.log(res.data);
            setSelectedDonation(res.data);
        })();

    }, []);

    const handleUpdateDonation = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const category = event.target.category.value;
        const amount = event.target.amount.value;
        const photoUrl = event.target.photoUrl.value;
        const details = event.target.details.value;

        console.log({ title, category, amount, photoUrl, details });

        const updatedDonation = {
            title,
            category,
            amount,
            photoUrl,
            details,
        }

        const res = await axiosPublic.patch(`/donation/${selectedDonation._id}`, updatedDonation);
        console.log(res.data);

        if (res.data.modifiedCount === 1) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your donation item is updated successfully.",
                showConfirmButton: false,
                timer: 1500
            });
            console.log("modifiedCount: ", res.data.modifiedCount);

            navigate("/dashboard/manageDonation");
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
    };

    return (
        <div>
            <h2 className="text-center">Update Donation...</h2>

            <div className="min-h-screen bg-base-200 rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdateDonation} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="" defaultValue={selectedDonation.title} className="input input-bordered" />
                            </div>

                            <div className='grid sm:grid-cols-2 gap-5'>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select name='category' className="select select-bordered" defaultValue={selectedDonation.category}>
                                        <option disabled value="default">Select one</option>
                                        <option value="cleanDrinkingWater">Clean Drinking Water</option>
                                        <option value="cleanDrinkingWater">Basic Education</option>
                                        <option value="cleanDrinkingWater">Animals Care</option>
                                        <option value="cleanDrinkingWater">Arts and Culture</option>
                                        <option value="cleanDrinkingWater">Save Homelessness</option>
                                        <option value="cleanDrinkingWater">Refuge Support</option>
                                        <option value="cleanDrinkingWater">Health Care</option>
                                        <option value="cleanDrinkingWater">Autism Awarness</option>
                                        <option value="cleanDrinkingWater">Flood Volunteering</option>
                                        <option value="cleanDrinkingWater">Earthquake Volunteering</option>
                                        <option value="cleanDrinkingWater">Energy Providing</option>
                                        <option value="cleanDrinkingWater">Traffic Volunteering</option>
                                    </select>
                                </label>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                    </label>
                                    <input type="number" name='amount' placeholder="" defaultValue={selectedDonation.amount} className="input input-bordered" />
                                </div>
                            </div>


                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo</span>
                                </div>
                                <input name='photoUrl' type="file" defaultValue={selectedDonation.photoUrl} className="file-input file-input-bordered w-full max-w-xs" />
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
                                <textarea name='details' className="textarea textarea-bordered h-24" placeholder="Write details about the donation..." defaultValue={selectedDonation.details}></textarea>
                            </label>

                            <div className="form-control mt-6">
                                {/* <button className="btn btn-primary">Add Donation</button> */}
                                <input className="btn btn-primary" type="submit" value="Update Donation" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateDonation;