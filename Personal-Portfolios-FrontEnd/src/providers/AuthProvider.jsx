import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase-config"
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const createEmailUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        });
    }

    // doenn't use yet
    const deleteUserProfile = () => {
        return deleteUser(auth.currentUser);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(`current user: `, currentUser);

            /* jwt for active user */
            if (currentUser) {
                const userEmail = { email: currentUser.email };
                (async () => {
                    const res = await axiosPublic.post(`/jwt`, userEmail)
                    // console.log(`jwt token: `res.data);

                    localStorage.setItem(`access-token`, res.data);
                })();

                setLoading(false);
            } else {
                console.log(`There are no current user.`);

                localStorage.removeItem(`access-token`);

                setLoading(false);
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createEmailUser,
        emailLogin,
        googleLogin,
        logout,
        updateUserProfile,
        deleteUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;