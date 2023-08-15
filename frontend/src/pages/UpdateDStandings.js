/*import { useContext, useEffect } from "react";
import { driverStandingsContext } from "../Contexts/DriverStandings";

const UpdateDStandings = () => {
    const {driverStandings, setDriverStandings} = useContext(driverStandingsContext);

    const getResult = async () => {
        const result = await fetch('http://ergast.com/api/f1/current/driverStandings.json')
        const resjson = await result.json()
        if(result.ok) {
            return resjson;
        }
    }

    const pushResult = async (rslt) => {
        const response = await fetch ('/standings/drivers/', {
            method: 'POST',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
    }

    useEffect(() => {
        const addNewResult = async () => {
            const result = await getResult();
            const reslt = result["MRData"]["StandingsTable"]["StandingsLists"][0];
            const { season, round, DriverStandings } = reslt;
            const resltAdd = { season, round, DriverStandings };
            try{
                await pushResult(resltAdd);
                await setDriverStandings(resltAdd);
            }
            catch(error) {console.log(error.message);}
        }
        addNewResult();
    }, []);

    return(
        <div>
            <h2>This page is used to add the last gp results</h2>
            { driverStandings && <p>Added drivers Standings!!</p>}
        </div>
    )

}

export default UpdateDStandings*/
import { useEffect } from "react";
import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";

const UpdateDStandings = () => {
    const {dStandings, dispatch} = useDriverStandingsContext();

    const getSeason = async () =>{
        try{
            const standings = await dStandings;
            console.log(standings.season);
        }catch(err) {console.log(err.message)}
    }

    const getData = async () => {
        const result = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
        const resjson = await result.json()
        if(result.ok) {
            return resjson;
        }
    }

    const modifyResult = async (rslt) => {
        const {season} = rslt
        const response = await fetch ('/standings/drivers/'+season, {
            method: 'PATCH',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
        else if(response.ok) dispatch({type: 'UPDATE_RESULTS', payload:json })
    }

    const pushResult = async (rslt) => {
        const response = await fetch ('/standings/drivers/', {
            method: 'POST',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
        else if(response.ok) dispatch({type: 'CREATE_RESULTS', payload:json })
    }

    const addNewStandings = async () => {
        const result = await getData();
        const reslt = result["MRData"]["StandingsTable"]["StandingsLists"][0];
        const { season, round, DriverStandings } = reslt;
        const resltAdd = { season, round, DriverStandings };
        try{
            await pushResult(resltAdd);
        }
        catch(error) {console.log(error.message);}
    }

    const updateStandings = async () => {
        const result = await getData();
        const reslt = result["MRData"]["StandingsTable"]["StandingsLists"][0];
        const { season, round, DriverStandings } = reslt;
        const resltAdd = { season, round, DriverStandings };
        try{
            await modifyResult(resltAdd);
        }
        catch(error) {console.log(error.message);}
    }

    useEffect(() =>{
        const fetchStandings = async () =>{
            const response = await fetch('/standings/drivers/')
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

export default UpdateDStandings