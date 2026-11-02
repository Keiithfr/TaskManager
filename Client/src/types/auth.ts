export interface User {
    id: string;
    name: string;
    email: string;
    profileImage: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User
    ) => void;
    logout: () => Promise<void>
    updateUser: (userData: Partial<User>) => void;
}


