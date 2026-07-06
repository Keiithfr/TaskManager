import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/auth";

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/me`, {
                    credentials: "include"
                }
                );
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
                else if (res.status === 401) {
                    setUser(null);
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err)
                }
            } finally {
                setLoading(false)
            }
        };


        fetchUser();


    }, []);

    const login = (userData: User) => {
        setUser(userData)

    }
    const logout = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            }
            );
            setUser(null);







        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
            }
        }

    }



    return (
        <AuthContext.Provider value={{
            user, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )

};
export default AuthProvider


