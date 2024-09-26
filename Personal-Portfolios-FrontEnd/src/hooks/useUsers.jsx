import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {

    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            console.log(res.data);

            return res.data;
        }
    })

    return { users, refetch };
};

export default useUsers;