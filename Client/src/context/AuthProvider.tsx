import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/auth";

interface Props {
    children: ReactNode;
}

export default AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login=()=>{
        
    }
    const logout=()=>{

    }

    useEffect(()=>{

    },[])

    return(
        <AuthContext.Provider value={{
            user,loading,login,logout
        }}>
            {children}
        </AuthContext.Provider>
    )

    }


