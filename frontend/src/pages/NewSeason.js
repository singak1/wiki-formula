import { useEffect, useState } from "react"

const NewSeason = () => {
    const [addSeason, setAddSeason] = useState(null)
    
    const getSeason = async () => {
        const result = await fetch('https://ergast.com/api/f1/current.json')
        const resjson = await result.json()
        if(result.ok) {
            return resjson;
        }
    }

    const pushRace = async (race) => {
        const response = await fetch ('/races/', {
            method: 'POST',
            body: JSON.stringify(race),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
    }
    
    useEffect(() => {
        const addNewSeason = async () => {
            const result = await getSeason();
            const races = result["MRData"]["RaceTable"]["Races"];
            for(var race of races) {
                const{ season, round, raceName, date, time, Sprint } = race;
                const country  = race.Circuit.Location.country;
                const { date: qualiDate, time: qualiTime } = race.Qualifying;
                var raceAdd;
                if(Sprint) {
                    var { date : sprintDate, time: sprintTime } = race.Sprint;
                    raceAdd = { season, round, raceName, date, time, country, qualiDate, qualiTime, sprintDate, sprintTime}
                }
                else { raceAdd = { season, round, raceName, date, time, country, qualiDate, qualiTime} }
                await pushRace(raceAdd);
            }
        }
        setAddSeason(true);
        addNewSeason();
    }, [])

    return(
        <div>
            <h2>This page runs code to add new season to my backend.</h2>
            { addSeason && <p>Season Updated!!</p> }
        </div>
    )
}

export default NewSeason