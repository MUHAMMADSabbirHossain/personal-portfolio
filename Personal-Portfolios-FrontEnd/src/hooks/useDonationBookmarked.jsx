import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';

const useDonationBookmarked = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: donationBookmarked = [] } = useQuery({
        queryKey: [`donationBookmarked`],
        queryFn: async () => {
            const res = await axiosPublic.post(`/bookmarks`, {
                email: user.email
            });
            console.log(res.data);
            return res.data;

        }
    })

    const donationBookmarkedTotalAmount = donationBookmarked.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.donationAmount), 0);

    return { donationBookmarked, donationBookmarkedTotalAmount };
};

export default useDonationBookmarked;