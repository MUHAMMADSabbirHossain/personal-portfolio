import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log(`from useAdmin: `, user.email);


    const { data: isAdmin = false, isPending } = useQuery({
        queryKey: [user?.email, `isAdmin`],
        queryFn: async () => {
            console.log("asking or checking is admin: ", user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(`useAdmin data res: `, res.data);

            return res.data;
        }
    })

    return { isAdmin, isPending };
};

export default useAdmin;