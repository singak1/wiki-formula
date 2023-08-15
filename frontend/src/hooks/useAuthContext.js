import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext can only be used inside an AuthContextProvider')
    }

    return context
}