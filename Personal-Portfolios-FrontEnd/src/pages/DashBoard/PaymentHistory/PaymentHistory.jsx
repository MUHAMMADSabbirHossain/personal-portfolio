import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../providers/AuthProvider';

const PaymentHistory = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [paymentItems, setPaymentItems] = useState([]);

    useEffect(() => {

        (async () => {
            const res = await axiosPublic.post("/paymentHistory", {
                email: user.email
            })
            console.log(res.data);
            setPaymentItems(res.data);

        })();

    }, []);

    console.log(paymentItems);


    return (
        <div>
            <h2 className='text-center'>Payment History...</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {paymentItems.map((item, index) => <tr>
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
                                    </div>
                                    <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div> */}
                                </div>
                            </td>
                            <td>${item.amount ? item.amount : 0}</td>
                            <td>{item.status}</td>

                        </tr>)}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;