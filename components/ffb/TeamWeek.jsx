import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PlayerList from "./PlayerList"
import { sortRoster } from "../../utils/sortRoster"

export default function TeamWeek({team, roster, score}){
   return (
      <div>
         <Box>
            <Typography variant="h6">{team.name + "  - " + score}</Typography>
            <PlayerList roster={sortRoster(roster)} />
         </Box>
      </div>
   )
}