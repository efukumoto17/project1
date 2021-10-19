import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { display, flexbox } from '@mui/system';
import Box from '@mui/material/Box';


export default function Matchup({matchup, homeTeam, awayTeam}) {
   let buildRoster = (roster) => {
      let rosterCmps = roster.map((player) => {
         return (
            <Box key={player.id} display="flex">
               <Typography>
                  {player.position + " " + player.player.fullName + " " + player.totalPoints}
                  </Typography>
            </Box>
         )
      })
      
      return (
         <Box>
            {rosterCmps}
         </Box>
      )
   }
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">{homeTeam.name} vs {awayTeam.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box display="flex" flexDirection="row">
                  <Box flexGrow={1}>
                     <Typography variant="h6">{homeTeam.name}</Typography>
                     {buildRoster(matchup.homeRoster)}
                  </Box>
                  <Box flexGrow={1}>
                     <Typography variant="h6">{awayTeam.name}</Typography>
                     {buildRoster(matchup.awayRoster)}
                  </Box>
               </Box>
            </AccordionDetails>
         </Accordion>
     </div>
   )
}