import { createContext, useReducer, useEffect } from "react";

export const ConstructorStandingsContext = createContext()

export const ConstructorStandingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESULTS' :
            return {
                cStandings: action.payload
            }
        case 'CREATE_RESULTS' :
            return {
                cStandings : action.payload
            }
        case 'UPDATE_RESULTS' :
            return{
                cStandings : action.payload
            }
        default :
            return {cStandings : state}
    }
}

export const ConstructorStandingsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ConstructorStandingsReducer, {
        cStandings: null
    })

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('/standings/constructors/')
            const json = await response.json()
            const reslt = await json[0]
            if (response.ok) {
                dispatch({type: 'SET_RESULTS', payload: reslt})
            }
        }
        fetchResults()
    }, [])

    return(
        <ConstructorStandingsContext.Provider value={{...state, dispatch}}>
            { children }
        </ConstructorStandingsContext.Provider>
    )}