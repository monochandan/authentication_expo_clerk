import { createContext, PropsWithChildren, useContext, useState } from "react";
import { boolean } from "zod";

const AuthContext = createContext({
    isAuthenticated: false,
    signIn: () => {},
    signOut: () => {},
});

// type PropsWithChildren = {
//     children: any
// }

export const AuthProvider = ({children} : PropsWithChildren) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = () => {
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, signOut}}>
                {children}
        </AuthContext.Provider>
    )
};

// create hook
export const useAuth = () => useContext(AuthContext);