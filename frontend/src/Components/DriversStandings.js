import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";
import { TableContainer ,Table, Thead, Tbody, Tr, Th, Td, Image, TableCaption, Text, Icon, useColorMode } from "@chakra-ui/react";
import {IoIosTrophy} from "react-icons/io"
import { useNavigate } from "react-router-dom";

const DriverStandings = () => {
    const {dStandings} = useDriverStandingsContext();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    const handleClick = () => {
        navigate("/standings/WDC");
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
            {dStandings &&
            <TableContainer cursor={"pointer"} maxW='auto' m='auto' mt='auto' borderRadius='10px' borderWidth='thin' borderColor='#C28FFF' borderStyle='solid' onClick={handleClick}>
                <Table size={['sm', 'md']}>
                    <TableCaption placement='top' m='auto'><Text as="b" fontSize="md">WDC Standings</Text></TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Pos.</Th>
                            <Th>Name</Th>
                            <Th display={['none', 'table-cell']}>Constructor</Th>
                            <Th display={['none', 'table-cell']}>Wins</Th>
                            <Th>Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dStandings.DriverStandings.slice(0,5).map((driver, index) => {
                            return(
                                <Tr key={index}>
                                    <Td>{driver.position === "1" ? <Icon as={IoIosTrophy} w={'22px'} h={'22px'} color="#F1C40F"/> : driver.position}</Td>
                                    <Td>{driver.Driver.familyName}</Td>
                                    <Td display={['none', 'table-cell']}><Image filter={colorMode === "dark" ? 'invert(1) grayscale(1)' : 'invert(0)'} m='auto' w='75px' h='22px' src={`/images/constructors/${getConstructor(driver.Constructors[0].name)}.svg`} /></Td>
                                    <Td display={['none', 'table-cell']}>{driver.wins}</Td>
                                    <Td>{driver.points}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            }
        </div>
    )
}

export default DriverStandings