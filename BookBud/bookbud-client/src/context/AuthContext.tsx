import { createContext, useContext, useState } from "react";

//represents a logged in user from the API
interface User {
    id: string;
    userName: string;
    isAdmin: boolean;
};

//what the AuthContext exposes to the app
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

//create the context, starts as undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);


//wraps the app and provides auth state
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    //set user when logging in
    const login = (user: User) => {
        setUser(user);
    };

    //clear user when logging out
    const logout = () => {
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user, //converts user to a boolean (true if user exists)
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider')
    }

    return context;
}