import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {

    const axiosPublic = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            console.log(res.data);

            return res.data;
        }
    })

    return { users };
};

export default useUsers;