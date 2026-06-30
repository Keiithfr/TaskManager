export interface User {
    id: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User
    ) => void;
    logout: () => Promise<void>
}


