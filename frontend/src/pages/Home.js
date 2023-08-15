import { useContext, useEffect } from "react";
import { lastResulContext } from "../Contexts/lastResult";
import { nextRaceContext } from "../Contexts/nextRaceContext";
import Navbar from "../Components/Navbar";
import NextRaceCard from "../Components/NextRaceCard";
import LastResultTable from "../Components/LastResultTable"
import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";
import DriversStandings from "../Components/DriversStandings"
import { Grid, GridItem } from "@chakra-ui/react";

const Home = () => {

    const { lastResult, setLastResult } = useContext(lastResulContext);
    const { nextRace, setNextRace } = useContext(nextRaceContext);
    const { dispatch } = useDriverStandingsContext();

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('/standings/drivers/')
            const json = await response.json()
            const reslt = await json[0]
            if (response.ok) {
                dispatch({type: 'SET_RESULTS', payload: reslt})
            }
        }

        const lastRound = async () => {
            try{
                const response = await fetch('/results/')
                const json = await response.json();
                await setLastResult(json[0]);
                return json[0];
            } catch(error) {
                console.log(error);
            }
        }
    
        const fetchRaces = async () => {
            let { season, round } = await lastRound();
            console.log(season, round);
            const rnd = ++round;
            console.log('/race/'+rnd);
            try{
                const response = await fetch('/races/'+rnd)
                const json = await response.json();
                await setNextRace(json);
            if (response.ok) {
            }
            } catch(error) 
            {
                console.log(error);
            }
        }
        fetchRaces()
        fetchResults()
    }, [dispatch])

    return(
        <div className="home">
            <Navbar />
            {nextRace && <NextRaceCard />}
            <Grid
                templateRows = {['repeat(5, 1fr)', 'repeat(4, 1fr)','repeat(4, 1fr)']}
                templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)','repeat(4, 1fr)']}
                gap={'2'}
                p={'2'}
            >
            <GridItem rowSpan={[3, 2, 4]} colSpan={[1, 1, 3]}>{lastResult && <LastResultTable data={lastResult}/>}</GridItem>
            <GridItem mt='auto' rowSpan={[1, 1, 2]} colSpan={1}>{<DriversStandings/>}</GridItem>
            <GridItem mt='auto' rowSpan={[1, 1, 2]} colSpan={1}>{<DriversStandings/>}</GridItem>
            </Grid>
        </div>
    )
}

export default Home;