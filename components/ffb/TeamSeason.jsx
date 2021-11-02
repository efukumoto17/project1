
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Link from 'next/link';

export default function TeamSeason({teams, setTeam}) {
   return (
      <div>
         {teams.map((team, idx) => Team(team, idx, setTeam))}
      </div>
   )
}

const Team = (team, idx, setTeam) =>{
   return (
      <div>
         
         <Card key={"team" + idx}>
            <CardContent>
               <Link href={`/ffb/team/${team.id}`}>
                  <a>
                     <Typography variant="headline" component="h2">
                        {team.name}
                     </Typography>
                  </a>
               </Link>
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
      </div>
   )
}
