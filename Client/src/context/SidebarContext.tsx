import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void
    closeSidebar: () => void
}


const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev)
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <SidebarContext.Provider
            value={{
                sidebarOpen,
                toggleSidebar,
                closeSidebar
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }

    return context;
}

