import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { display, flexbox } from '@mui/system';
import Box from '@mui/material/Box';
import PlayerList from './PlayerList';
import { sortRoster } from '../../utils/sortRoster';


export default function Matchup({matchup, homeTeam, awayTeam}) {

   
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">{homeTeam.name} vs {awayTeam.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box display="flex" flexDirection="row">
                  <Box flexGrow={1} margin={1}>
                     <Typography variant="h6">{homeTeam.name + " - " + matchup.homeScore}</Typography>
                     <PlayerList roster={sortRoster(matchup.homeRoster)} />
                  </Box>
                  <Box flexGrow={1} margin={1}>
                     <Typography variant="h6">{awayTeam.name + "  - " + matchup.awayScore}</Typography>
                     <PlayerList roster={sortRoster(matchup.awayRoster)} />
                  </Box>
               </Box>
            </AccordionDetails>
         </Accordion>
     </div>
   )
}