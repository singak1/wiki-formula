import { DriverStandingsContext } from "../Contexts/DriverStandings"
import { useContext } from "react";

export const useDriverStandingsContext = () => {
    const context = useContext(DriverStandingsContext)

    if (!context) {
        throw Error('useDriverStandingsContext can only be used inside an DriverStandingsContextProvider')
    }

    return context
}