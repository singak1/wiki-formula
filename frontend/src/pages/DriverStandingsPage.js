import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";
import { Grid, Card, Image, Text, useColorMode, Flex, Spacer, Box } from "@chakra-ui/react";
import { useEffect} from "react"
import Navbar from "../Components/Navbar";

const DriverStandingsPage = () => {
    const {dStandings, dispatch} = useDriverStandingsContext();
    const { colorMode } = useColorMode();

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('/standings/drivers/')
            const json = await response.json()
            const reslt = await json[0]
            if (response.ok) {
                dispatch({type: 'SET_RESULTS', payload: reslt})
            }
        }
        fetchResults()
    },[dispatch])

    const getName = (nm) => {
        if(nm === "Pérez") return "Perez"
        else if(nm === "Hülkenberg") return "Hulkenberg"
        else if(nm === "de Vries") return "default"
        else if(nm === "Lawson") return "default"
        else return nm
    }
    
    const getConstructor = (nm) => {
        if(nm === "Red Bull") return "RedBull"
        else if(nm === "Aston Martin") return "Aston"
        else if(nm === "Alpine F1 Team") return "Alpine"
        else if(nm === "Haas F1 Team") return "Haas"
        else if(nm === "Alfa Romeo") return "Alfa"
        else if(nm === "AlphaTauri") return "Alpha"
        else return nm
    }

    return(
        <div>
            <Navbar />
            {   dStandings &&
                <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} gap={[2,4]} p={[1, 2, 4]}>
                    {dStandings.DriverStandings.map((driver, index) => (
                        <Card key={index} pt={['5', '10']} pb={['5', '10']} pr={['2', '4']} pl={['2', '4']}>
                            <Flex alignItems="center">
                                <Image  borderRadius="full" boxSize={["55px", "75px"]} src={`/images/faces/${getName(driver.Driver.familyName)}.png`} />
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{driver.position}</Text>
                                    <Text color='gray.400'>Pos.</Text>
                                </Box>
                                <Spacer/>
                                <Box minW={['75px','135px']}>
                                    <Image filter={colorMode === "dark" ? 'invert(1) grayscale(1)' : 'invert(0)'} m='auto' maxW={['75px','135px']} maxH={['35px','55px']} src={`/images/constructors/${getConstructor(driver.Constructors[0].name)}.svg`} />
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{driver.Driver.familyName}</Text>
                                    <Text color='gray.400'>Name</Text>
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{driver.wins}</Text>
                                    <Text color='gray.400'>Wins</Text>
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{driver.points}</Text>
                                    <Text color='gray.400'>Points</Text>
                                </Box>
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            }
        </div>
    )
}

export default DriverStandingsPage