import { ConstructorStandingsContext } from "../Contexts/ConstructorStandings";
import { useContext } from "react";

export const useConstructorStandingsContext = () => {
    const context = useContext(ConstructorStandingsContext)

    if (!context) {
        throw Error('useConstructorStandingsContext can only be used inside an ConstructorStandingsContextProvider')
    }

    return context
}