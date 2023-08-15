import { createContext, useReducer } from "react";

export const DriverStandingsContext = createContext()

export const DriverStandingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESULTS' :
            return {
                dStandings: action.payload
            }
        case 'CREATE_RESULTS' :
            return {
                dStandings : action.payload
            }
        case 'UPDATE_RESULTS' :
            return{
                dStandings : action.payload
            }
        default :
            return {dStandings : state}
    }
}

export const DriverStandingsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DriverStandingsReducer, {
        dStandings: null
    })

    return(
        <DriverStandingsContext.Provider value={{...state, dispatch}}>
            { children }
        </DriverStandingsContext.Provider>
    )}