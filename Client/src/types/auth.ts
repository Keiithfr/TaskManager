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

export interface Task {
    _id: string;
    userId: string;
    title: string;
    category: string;
    dueDate: string | null;
    dueTime: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;

}


