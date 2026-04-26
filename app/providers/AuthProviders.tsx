import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
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

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    // if the user already authenticated, after 2 second redirect to the home screen.
    useEffect(() => {
        const checkAuth = async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsAuthenticated(true);
        };
        checkAuth();
    }, [])

    const signIn = () => {
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setIsAuthenticated(false);
    };

    if(isAuthenticated === undefined){
        return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, signOut}}>
                {children}
        </AuthContext.Provider>
    )
};

// create hook
export const useAuth = () => useContext(AuthContext);