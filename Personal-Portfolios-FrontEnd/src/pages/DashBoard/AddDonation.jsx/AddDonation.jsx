import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AddDonation = () => {

    const handleAddDonaiton = async (event) => {
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.title.value);

        const axiosPublic = useAxiosPublic();

        const form = new FormData(event.currentTarget);
        const title = form.get("title");
        const category = form.get("category");
        const amount = form.get("amount");
        const photoUrl = form.get("photoUrl");
        const details = form.get("details");
        console.log(title, category, amount, details);
        const donationItem = {
            title,
            category,
            amount,
            // photoUrl,
            details
        }

        // fetch(`http://localhost:5000/donation`, {
        //     method: "POST",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(donationItem)
        // })
        //     .then(response => {
        //         // Check if the request was successful
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         // Parse the response as JSON
        //         return response.json();
        //     })
        //     .then(data => {
        //         // Handle the JSON data
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })

        const res = await axiosPublic.post("/donation", donationItem);
        console.log(res.data);

        if (res.data?.insertedId) {
            console.log(res.data.insertedId);
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Wait for the response."
            })
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your donation item has been successfully saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })

        }
        else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Wait for the response."
            })
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "errro",
                        title: "Somethings went Wrong. Please try again.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })

        }
    }

    return (
        <div>
            <h2 className='text-center'> Add Donation...</h2>

            <div className="min-h-screen bg-base-200 rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleAddDonaiton} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' id='title' placeholder="" className="input input-bordered" />
                            </div>

                            <div className='grid sm:grid-cols-2 gap-5'>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select name='category' className="select select-bordered" defaultValue="default">
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
                                    <input type="number" name='amount' placeholder="" className="input input-bordered" />
                                </div>
                            </div>


                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo</span>
                                </div>
                                <input name='photoUrl' type="file" className="file-input file-input-bordered w-full max-w-xs" />
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
                                <textarea name='details' className="textarea textarea-bordered h-24" placeholder="Write details about the donation..."></textarea>
                            </label>

                            <div className="form-control mt-6">
                                {/* <button className="btn btn-primary">Add Donation</button> */}
                                <input className="btn btn-primary" type="submit" value="Add Donation" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDonation;