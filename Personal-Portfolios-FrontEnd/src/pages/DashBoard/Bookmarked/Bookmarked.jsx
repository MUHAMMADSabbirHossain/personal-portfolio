import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Bookmarked = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    useEffect(() => {

        (async () => {
            const res = await axiosPublic.post(`/bookmarks`, {
                email: user.email
            });
            setBookmarks(res.data);
        })()

    }, []);

    console.log(bookmarks);

    const totalAmount = bookmarks.reduce((total, bookmark) => total + parseFloat(bookmark.amount), 0);

    const handleDeletebookmark = async (bookmark) => {
        console.log(bookmark,);

        const res = await axiosPublic.delete(`/bookmark/${bookmark._id}`);
        console.log(res.data);

        if (res.data.deletedCount === 1) {
            console.log(res.data.deletedCount);

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
                        title: "Your bookmarked item has been successfully deleted.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        }
    }

    return (
        <div>
            <h2 className='text-center'>Bookmarked...</h2>

            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl">Bookmarkeds: ({bookmarks.length})</h2>

                <h2 className="text-4xl">Total Amount: ${totalAmount}</h2>

                {
                    bookmarks.length ?
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary">Pay Now</button>
                        </Link> :
                        <button disabled className="btn btn-primary">Pay Now</button>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
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
                                        onClick={() => handleDeletebookmark(bookmark)} className="btn btn-ghost btn-xs">Delete</button>
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