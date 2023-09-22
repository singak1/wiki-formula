import { useConstructorStandingsContext } from "../hooks/useConstructorStandingsContext"
import { useEffect } from "react";
import { useColorMode, Card, Grid, Flex, Box, Image, Text, Spacer } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Flag from "../Helper/Flag";

const ConstructorStandingsPage = () => {
    const {cStandings, dispatch} = useConstructorStandingsContext();
    const { colorMode } = useColorMode();

    useEffect(() => {
        window.scrollTo(0,0); //Scroll to top everytime route changes
        const fetchResults = async () => {
            const response = await fetch('/standings/constructors/')
            const json = await response.json()
            const reslt = await json[0]
            if (response.ok) {
                dispatch({type: 'SET_RESULTS', payload: reslt})
            }
        }
        fetchResults()
    },[dispatch])

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
            {   cStandings &&
                <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)"]} gap={[2,4]} p={[1, 2, 4]}>
                    {cStandings.ConstructorStandings.map((constructor, index) => (
                        <Card key={index} pt={['5', '10']} pb={['5', '10']} pr={['2', '4']} pl={['2', '4']}>
                            <Flex alignItems="center">
                                <Box>
                                    <Image borderRadius='15px' height='30px' width='60px' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${Flag(constructor.Constructor.nationality)}.svg`} />
                                </Box>
                                <Spacer/>
                                <Box minW={['75px','135px']}>
                                    <Image filter={colorMode === "dark" ? 'invert(1) grayscale(1)' : 'invert(0)'} m='auto' maxW={['75px','135px']} maxH={['35px','55px']} src={`/images/constructors/${getConstructor(constructor.Constructor.name)}.svg`} />
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{constructor.Constructor.name}</Text>
                                    <Text color='gray.400'>Name</Text>
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{constructor.position}</Text>
                                    <Text color='gray.400'>Pos.</Text>
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{constructor.wins}</Text>
                                    <Text color='gray.400'>Wins</Text>
                                </Box>
                                <Spacer/>
                                <Box textAlign='center'>
                                    <Text as='b' mt='2px' mb='2px'>{constructor.points}</Text>
                                    <Text color='gray.400'>Points</Text>
                                </Box>
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            }
            <Footer/>
        </div>
    )
}

export default ConstructorStandingsPage