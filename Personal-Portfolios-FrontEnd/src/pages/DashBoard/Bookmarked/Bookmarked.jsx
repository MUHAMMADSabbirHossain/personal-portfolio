import React from 'react';
import { Link } from 'react-router-dom';;
import Swal from 'sweetalert2';
import useDonationBookmarked from '../../../hooks/useDonationBookmarked';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';

const Bookmarked = () => {

    const { donationBookmarked: bookmarks, refetch, donationBookmarkedTotalAmount: totalAmount } = useDonationBookmarked();
    const axiosSecure = useAxiosSecure();

    const handleDeletebookmark = async (bookmark) => {
        // console.log(bookmark);

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

                const res = await axiosSecure.delete(`/bookmark/${bookmark._id}`);
                // console.log(res.data);

                if (res.data.deletedCount === 1) {
                    // console.log(res.data.deletedCount);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    refetch();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            }
        });

    }

    return (
        <div>
            <h2 className='text-center'>Bookmarked...</h2>

            <div className="flex justify-evenly mb-8">
                <h2 className="text-2xl font-bold sm:text-4xl">Bookmarkeds: ({bookmarks.length})</h2>

                <h2 className="text-2xl sm:text-4xl">Total Amount: ${totalAmount}</h2>

                {
                    bookmarks.length ?
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary px-5">Pay Now</button>
                        </Link> :
                        <button disabled className="btn btn-primary">Pay Now</button>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>#</th>
                            {/* <th>image</th> */}
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookmarks.map((bookmark, index) => <tr key={bookmark._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>{index + 1}</td>
                                {/* <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={bookmark.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td> */}
                                <td>{bookmark.donationTitle}</td>
                                <td>${bookmark.donationAmount}</td>
                                <th>
                                    {/* <button
                                        onClick={() => handleDelete(bookmark._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button> */}
                                    <button
                                        onClick={() => handleDeletebookmark(bookmark)} className="btn btn-ghost btn-xs">
                                        <MdDelete className='text-2xl text-red-600' />
                                    </button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}

                </table>
            </div>
        </div>
    );
};

export default Bookmarked;