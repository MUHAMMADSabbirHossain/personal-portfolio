import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            console.log(res.data);

            return res.data;
        }
    })

    return { users, refetch };
};

export default useUsers;