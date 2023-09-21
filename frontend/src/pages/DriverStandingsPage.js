import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";
import { Grid, Card, Image, Text, useColorMode, Flex, Spacer } from "@chakra-ui/react";
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
            {/*dStandings &&
            <TableContainer maxW='auto' m='auto' mt='auto'>
                <Table size={['sm', 'lg']}>
                    <TableCaption placement='top' mt='auto'><Text fontSize="2xl">WDC Standings</Text></TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Pos.</Th>
                            <Th textAlign={"center"}>Name</Th>
                            <Th textAlign={"center"} display={['none', 'table-cell']}>Constructor</Th>
                            <Th display={['none', 'table-cell']}>Wins</Th>
                            <Th>Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dStandings.DriverStandings.map((driver, index) => {
                            return(
                                <Tr key={index}>
                                    <Td>{driver.position === "1" ? <Icon as={IoIosTrophy} w={'40px'} h={'40px'} color="#F1C40F"/> : driver.position}</Td>
                                    <Td><Flex alignItems="center" justifyContent="space-evenly">{driver.Driver.familyName} <Image borderRadius="full" boxSize={"55px"} src={`/images/faces/${getName(driver.Driver.familyName)}.png`} /></Flex></Td>
                                    <Td display={['none', 'table-cell']}><Image filter={colorMode === "dark" ? 'invert(1) grayscale(1)' : 'invert(0)'} m='auto' maxW={'135px'} maxH='55px' src={`/images/constructors/${getConstructor(driver.Constructors[0].name)}.svg`} /></Td>
                                    <Td display={['none', 'table-cell']}>{driver.wins}</Td>
                                    <Td>{driver.points}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
                    */}
            {   dStandings &&
                <Grid templateColumns="repeat(2, 1fr)" gap={4} p={4}>
                    {dStandings.DriverStandings.map((driver, index) => (
                        <Card key={index} p="10">
                            <Flex alignItems="center">
                                <Image  borderRadius="full" boxSize={"55px"} src={`/images/faces/${getName(driver.Driver.familyName)}.png`} />
                                <Spacer/>
                                <Text>{driver.position}</Text>
                                <Spacer/>
                                <Image filter={colorMode === "dark" ? 'invert(1) grayscale(1)' : 'invert(0)'} m='auto' maxW={'135px'} maxH='55px' src={`/images/constructors/${getConstructor(driver.Constructors[0].name)}.svg`} />
                                <Spacer/>
                                <Text >{driver.Driver.familyName}</Text>
                                <Spacer/>
                                <Text >{driver.wins}</Text>
                                <Spacer/>
                                <Text >{driver.points}</Text>
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            }
        </div>
    )
}

export default DriverStandingsPage