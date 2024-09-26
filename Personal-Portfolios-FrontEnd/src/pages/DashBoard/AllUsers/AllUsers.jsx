import React, { useContext } from 'react';
import useUsers from '../../../hooks/useUsers';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthProvider';

const AllUsers = () => {
    const { users, refetch } = useUsers();
    const axiosPublic = useAxiosPublic();
    // const { deleteUserProfile } = useContext(AuthContext);

    const handleUserDelete = async (id) => {
        console.log(id);

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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                // for yes
                // delete user profile from firebase

                // delete user profile from mongodb
                const res = await axiosPublic.delete(`/user/${id}`);
                console.log(res.data);

                if (res.data?.deletedCount === 1) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User has been deleted successfully.",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    refetch();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${res.data?.message}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        });
    }

    return (
        <div>
            <h2 className="text-center">All Usres...</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        {/* <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div> */}
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Update</button>
                                    <button onClick={() => handleUserDelete(user._id)} className="btn btn-ghost btn-xs">Delete</button>
                                </th>
                            </tr>
                            )
                        }

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;