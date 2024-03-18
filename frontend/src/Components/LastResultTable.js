import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Text, Image, Flex, TableCaption } from "@chakra-ui/react"
import { useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import Flag from "../Helper/Flag"
  import { useDriverStandingsContext } from "../hooks/useDriverStandingsContext";


const LastResultTable = (res) => {
    const data = res.data.Results
    const [lName, setLName] = useState(null);
    const [flg, setFlg] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { dStandings } = useDriverStandingsContext();
    
    const getWins = () => {
      try{const driverstandings = dStandings.DriverStandings
      for (const drivers of driverstandings){
        if(drivers.Driver.familyName === lName) {
          return drivers.wins;
        }
      }
      } catch(err) {console.log(err.message)}
    }
    const getPoints = () => {
      try{ const driverstandings = dStandings.DriverStandings
      for (const drivers of driverstandings){
        if(drivers.Driver.familyName === lName) {
          return drivers.points;
        }
      }
    } catch(err) {console.log(err.message)}
    }
    const getPosition = () => {
      try { const driverstandings = dStandings.DriverStandings
      for (const drivers of driverstandings){
        if(drivers.Driver.familyName === lName) {
          return drivers.position;
        }
      }
    } catch(err) {console.log(err.message)}
    }

    return(
        <div>
            <TableContainer maxW='auto' m='auto' borderRadius='10px' borderWidth='thin' borderColor='#C28FFF' borderStyle='solid'>
                <Table variant='simple' size={['sm']}>
                  <TableCaption mt="auto" placement="top"><Text mt="auto" as="b" fontSize="md">Last Race Results</Text></TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Pos</Th>
                            <Th>Qualified</Th>
                            <Th>Name</Th>
                            <Th display={['none', 'table-cell']}>Constructor</Th>
                            <Th display={['none', 'table-cell']}>Fastest Lap</Th>
                            <Th>Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody cursor="pointer">
                        {(data.map((result, index) => {
                            const { positionText, points, grid} = result;
                            const lastName = result.Driver.familyName;
                            const constructor = result.Constructor.name;
                            const flag = result.Driver.nationality
                            let fastestLap;
                            let lapRank;
                            if ( positionText === "R" || positionText === "W" || positionText === "D") {
                                fastestLap = "NA";
                                lapRank = "NA";
                            }
                            else {
                                fastestLap = result.FastestLap.Time.time;
                                lapRank = result.FastestLap.rank;
                            }
                            return(
                            <Tr key={index} onClick={() => {onOpen(); setLName(lastName); setFlg(flag);}}>
                                <Td >{positionText}</Td>
                                <Td >{grid}</Td>
                                <Td >{lastName}</Td>
                                <Td display={['none', 'table-cell']}>{constructor}</Td>
                                <Td backgroundColor={(lapRank === '1') ? "#a65aed" : "FFFFFF"} display={['none', 'table-cell']} >{fastestLap}</Td>
                                <Td >{points}</Td>
                            </Tr>
                            )
                        }))}
                    </Tbody>
                </Table>
                </TableContainer>
                { dStandings &&  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay 
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
               <ModalContent alignItems={'center'} ml='5px' mr='5px' borderRadius='15px' motionPreset='scale'>
                  <ModalHeader><Flex alignItems='center'><Image borderRadius='15px' height='25px' width='50px' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${Flag(flg)}.svg`} />{lName}</Flex></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody alignItems={"center"} display={'contents'}>
                    <Image borderRadius='15px' boxSize={"200px"} src={`/images/drivers/${lName === "Pérez" ? "Perez" : (lName === "Hülkenberg" ? "Hulkenberg" : lName)}.avif`}/>
                    <Text fontWeight='bold'>Season Stats</Text>
                    <Text> Wins: {getWins()}</Text>
                    <Text>Points: {getPoints()}</Text>
                    <Text>Current Standing: {getPosition()}</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
                </Modal> }
              </div>
)}

export default LastResultTable