import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ManageDonation = () => {
    const loadedDonations = useLoaderData();
    const donations = loadedDonations;
    console.log(donations);
    const axiosPublic = useAxiosPublic();

    function handleDeleteDonation(id) {
        console.log(id);
        // const res = await axiosPublic.delete(`donation/${id}`);
        // console.log(res.data);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`donation/${id}`);
                console.log(res.data);

                if (res.data?.deletedCount === 1) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Donation Item has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Somethings went Wrong! Please try again.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    return (
        <div>
            <h2 className="text-center">Manage Donation...</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra table-xs md:table-md lg:table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>#</th>
                            <th>Photo</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            donations.map((donation, index) => <tr key={donation._id}>
                                {/* <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th> */}
                                <td>{index + 1}</td>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="" alt={donation.title} />
                                    </div>
                                </div></td>
                                <td>
                                    <div>
                                        <div className="font-bold">{donation.title}</div>
                                    </div>
                                </td>
                                <td>{donation.category}</td>
                                <td className='text-right'>${donation.amount}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Update</button>
                                    <button
                                        onClick={() => handleDeleteDonation(donation._id)} className="btn btn-ghost btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
};

export default ManageDonation;