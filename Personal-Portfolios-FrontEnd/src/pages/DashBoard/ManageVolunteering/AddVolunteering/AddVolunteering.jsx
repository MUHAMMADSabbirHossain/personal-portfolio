import React from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useCategoris from '../../../../hooks/useCategoris';
import useImageUploader from '../../ManageDonation/AddDonation/useImageUploader';

const AddVolunteering = () => {

    const { categories } = useCategoris();
    const { imageUpload } = useImageUploader();

    const handleAddVolunteering = async (event) => {
        event.preventDefault();
        console.log(event.target);
        // console.log(event.target.title.value);

        const axiosPublic = useAxiosPublic();

        const form = new FormData(event.currentTarget);
        const title = form.get("title");
        const category = form.get("category");
        const address = form.get("address");
        const photoUrl = form.get("photoUrl");
        const details = form.get("details");
        console.log(title, category, address, details);
        const volunteeringItem = {
            title,
            category,
            address,
            details
        };

        const photoUploadRes = await imageUpload(photoUrl);
        console.log(photoUploadRes);

        if (photoUploadRes?.status === 200) {
            // after getting success response from image upload send the data to DB.
            volunteeringItem[`photoUrl`] = photoUploadRes.data?.display_url;
            console.log(volunteeringItem);

            const res = await axiosPublic.post("/volunteering", volunteeringItem);
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
                            title: "Your volunteering item has been successfully saved",
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
    }

    return (
        <div>
            <h2 className="text-center">Add Volunteering...</h2>

            <div className="min-h-screen bg-base-200 rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse m-10 mx-auto">

                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleAddVolunteering} className="card-body">

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
                                        {
                                            categories.map((category, index) => <option value={category.value} key={index}>{category.name}</option>)
                                        }
                                    </select>
                                </label>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input type="text" name='address' placeholder="local-area, city" className="input input-bordered" />
                                </div>
                            </div>


                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo (up to 32mb)</span>
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
                                    <span className="label-text">Details (up to 150 alphabets)</span>
                                </div>
                                <textarea name='details' className="textarea textarea-bordered h-24" placeholder="Write details about the volunteering..."></textarea>
                            </label>

                            <div className="form-control mt-6">
                                {/* <button className="btn btn-primary">Add Donation</button> */}
                                <input className="btn btn-primary" type="submit" value="Add Volunteering" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteering;