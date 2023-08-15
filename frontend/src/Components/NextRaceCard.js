import { Card, Text, Heading, Divider, Image, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { nextRaceContext } from "../Contexts/nextRaceContext";
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import parseISO from "date-fns/parseISO";
import Countdown from 'react-countdown';
import Flag from "../Helper/Flag"

const NextRaceCard = () => {
    const { nextRace } = useContext(nextRaceContext);
    const { date, time } = nextRace;
    const racedatetime = date+'T'+time;
    var timetill;
    const flg = Flag(nextRace.country)

    timetill = formatDistanceStrict(parseISO(new Date().toISOString()),parseISO(racedatetime),{unit: 'second'});
    timetill = parseInt(timetill.slice(0,-8));
    timetill = timetill * 1000;

    const Completionist = () => <span>Race is live</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
        <span>
            {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </span>
        );
    }
    };

    return(
        <div>
            <Card  maxW={['xs','sm' ,'md']} m={['auto']} mt='10px' p={'2'} >
                    <Heading size='md'>Next Race</Heading>
                    <Divider color='lightgray'/>
                    <Grid templateColumns='repeat(4,1fr)' alignItems={'center'} pr={'2'} pl={'2'} pt={'2'} pb={'2'}>
                        <GridItem rowSpan={3} colSpan={1}><Image borderRadius='10px' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flg}.svg`} /></GridItem>
                        <GridItem rowSpan={1} colSpan={3}><Text>{nextRace.raceName}</Text></GridItem>
                        <GridItem rowSpan={1} colSpan={3}><Text>{nextRace.country} {nextRace.season}</Text></GridItem>
                        <GridItem rowSpan={1} colSpan={3}><Text>Round {nextRace.round}</Text></GridItem>
                    </Grid>
                    <Text as='b' noOfLines={'1'}><Countdown date={Date.now() + timetill} renderer={renderer}/></Text>
                    {/*flg &&  <GridItem rowSpan={2} colSpan={1}><Image src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${flg}.svg`} /></GridItem>*/}
            </Card>
        </div>
    )
}

export default NextRaceCard