
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

export default function TeamSeason({teams}) {
   return (
      <div>
         {teams.map((team, idx) => Team(team, idx))}
      </div>
   )
}

const Team = (team, idx) =>{
   console.log(team)
   return (
      <Card key={"team" + idx}>
         <CardContent>
            <Typography variant="headline" component="h2">
               {team.name}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
               <Box 
                flexGrow={1}
                sx={{
                  height: '100px',
                  width: '100px',
                }}>
                  <img 
                   style={{height: '100%', width: '100%'}}
                   src={team.logoURL} 
                   alt={team.name} />
               </Box>
               <Box flexGrow={2}>
                  <Typography component="p">
                     {team.wins} - {team.losses}
                  </Typography>
                  <Typography component="p">
                     {team.pointsFor} - {team.pointsAgainst}
                  </Typography>
                  <Typography component="p">
                     playoff seed: {team.playoffSeed}
                  </Typography>
               </Box>
            </Box>
         </CardContent>
      </Card>
   )
}
