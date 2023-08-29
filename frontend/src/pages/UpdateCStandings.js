import { useContext, useEffect } from "react";
import { useConstructorStandingsContext } from "../hooks/useConstructorStandingsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const UpdateCStandings = () => {
    const { cStandings, dispatch } = useConstructorStandingsContext()
    const { user } = useAuthContext()

    const getSeason = async () =>{
        try{
            const standings = await cStandings;
            console.log(standings.season);
        }catch(err) {console.log(err.message)}
    }

    const getData = async () => {
        const result = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const resjson = await result.json()
        if(result.ok) {
            return resjson;
        }
    }

    const modifyResult = async (rslt) => {
        const {season} = rslt
        const response = await fetch ('/standings/constructors/' +season, {
            method: 'PATCH',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
        else if(response.ok) dispatch({type: 'UPDATE_RESULTS', payload:json })
    }

    const pushResult = async (rslt) => {
        const response = await fetch ('/standings/constructors/', {
            method: 'POST',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
        else if(response.ok) dispatch({type: 'CREATE_RESULTS', payload:json })
    }

    const addNewStandings = async () => {
        const result = await getData();
        const reslt = result["MRData"]["StandingsTable"]["StandingsLists"][0];
        const { season, round, ConstructorStandings } = reslt;
        const resltAdd = { season, round, ConstructorStandings };
        try{
            await pushResult(resltAdd);
        }
        catch(error) {console.log(error.message);}
    }

    const updateStandings = async () => {
        const result = await getData();
        const reslt = result["MRData"]["StandingsTable"]["StandingsLists"][0];
        const { season, round, ConstructorStandings } = reslt;
        const resltAdd = { season, round, ConstructorStandings };
        try{
            await modifyResult(resltAdd);
        }
        catch(error) {console.log(error.message);}
    }

    useEffect(() =>{
        const fetchStandings = async () =>{
            const response = await fetch('/standings/constructors/')
            const json = await response.json()
            const reslt = await json[0]
            if (response.ok) {
                await dispatch({type: 'SET_RESULTS', payload: reslt})
            }
        }
        fetchStandings()
    },[dispatch])

    return(
        <div>
            <button onClick={addNewStandings}>Add New Standings</button>
            {<button onClick={getSeason}>Get Season</button>}
            <button onClick={updateStandings}>Update Standings</button>
        </div>
    )
}

export default UpdateCStandings