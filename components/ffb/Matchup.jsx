import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

import PlayerList from './PlayerList';
import { sortRoster } from '../../utils/sortRoster';

const matchupSorts = [
   "Highest total score",
   "Lowest total score",
   "Highest differential",
   "Lowest differential"
]

export default function Matchup({matchup, homeTeam, awayTeam, sort}) {
   let title = ""
   if(sort === matchupSorts[0] || sort === matchupSorts[1]) {
      let total = matchup.homeScore + matchup.awayScore
      title = homeTeam.name + " vs " + awayTeam.name + " " + total
   }
   if(sort === matchupSorts[2] || sort === matchupSorts[3]) {
      let diff = Math.abs(matchup.homeScore - matchup.awayScore)
      title = homeTeam.name + " vs " + awayTeam.name + " " + diff
   }
   
   
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">{title}</Typography>
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