import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useDonationBookmarked = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: donationBookmarked = [], refetch } = useQuery({
        queryKey: [`donationBookmarked`],
        queryFn: async () => {
            const res = await axiosSecure.post(`/bookmarks`, {
                email: user.email
            });
            console.log(res.data);

            return res.data;
        }
    });

    const donationBookmarkedTotalAmount = donationBookmarked.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.donationAmount), 0);

    return { donationBookmarked, refetch, donationBookmarkedTotalAmount };
};

export default useDonationBookmarked;