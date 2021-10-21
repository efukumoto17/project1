import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import PlayerList from "./PlayerList"
import { sortRoster } from "../../utils/sortRoster"

const teamSorts = [
   "Highest total score",
   "Lowest total score"
]

export default function TeamWeek({team, roster, score, sort}){
   let title = team.name + " " + score


   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box>
                  <Typography variant="h6">{team.name + "  - " + score}</Typography>
                  <PlayerList roster={sortRoster(roster)} />
               </Box>
            </AccordionDetails>
         </Accordion>
      </div>
   )
}