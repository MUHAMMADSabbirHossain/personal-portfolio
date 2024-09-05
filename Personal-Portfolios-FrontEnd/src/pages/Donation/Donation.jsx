import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Donation = () => {

    const loadedDonations = useLoaderData();
    const donations = loadedDonations;
    console.log(donations);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    console.log(user);


    async function handleBookmark(donation) {
        console.log(donation);

        const res = await axiosPublic.post(`/bookmark`, {
            email: user?.email,
            donationId: donation._id,
            donationTitle: donation.title,
            donationAmount: parseInt(donation.amount)
        });
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
                        title: "Your donation item has been successfully bookmarked.",
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
            <h2 className='text-center'>This is Donation page.</h2>

            <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
                {
                    donations.map((donation) => <div key={donation._id}>
                        <div className="card max-w-96 glass mx-auto">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={donation.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{donation.title} <div className="badge badge-secondary font-bold">${donation.amount}</div>
                                </h2>
                                <p>{donation.details}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleBookmark(donation)}
                                        className="btn btn-primary">Bookmark</button>
                                    <button className="btn btn-primary">Donate now!</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Donation;