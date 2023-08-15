import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

const NewResult = () => {
    const [addedResult, setAddedResult] = useState(null);
    const { user } = useAuthContext()

    const getResult = async () => {
        const result = await fetch('http://ergast.com/api/f1/current/last/results.json')
        const resjson = await result.json()
        if(result.ok) {
            return resjson;
        }
    }

    const pushResult = async (rslt) => {
        const response = await fetch ('/results/', {
            method: 'POST',
            body: JSON.stringify(rslt),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
    }

    useEffect(() => {
        const addNewResult = async () => {
            const result = await getResult();
            const reslt = result["MRData"]["RaceTable"]["Races"][0];
            const { season, round, Results } = reslt;
            const resltAdd = { season, round, Results };
            await pushResult(resltAdd);
        }
        if(user) {
        addNewResult();
        setAddedResult(true);
        }
    }, [user]);

    return(
        <div>
            <h2>This page is used to add the last gp results</h2>
            { addedResult && <p>Added Result!!</p>}
        </div>
    )
}

export default NewResult