import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function PlayerList ({roster}){

   let rosterCmps = roster.map((player) => {
      return (
         <Box key={player.player.id +"player"} display="flex">
            <Box flexGrow={1}>
               <Typography variant="body1">{player.position}</Typography>
            </Box>
            <Box flexGrow={1}>
               <Typography variant="body1">{player.player.fullName}</Typography>
            </Box>
            <Box>
               <Typography variant="body1">{player.totalPoints}</Typography>
            </Box>
         </Box>
      )
   })
   
   return (
      <Box>
         {rosterCmps}
      </Box>
   )
}