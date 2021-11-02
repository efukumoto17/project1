import Layout from "../../../components/layout";
import {buildTeamsSeason} from "../../../utils/buildTeamsSeason";
import TeamRoster from "../../../components/ffb/TeamRoster";
import { getWeekBoxScore, getWeek, getTeamsAtWeek } from "../../../utils/espnClient";

import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Link from 'next/link'


export default function Team() {
   const [team, setTeam] = useState(null);
   const router = useRouter();
   const { teamId } = router.query;
   const prevTeam = usePrevious(team);
   const [boxScoreTeam, setBoxScoreTeam] = useState(null);
   const [week, setWeek] = useState(null);
   const [boxScore, setBoxScore] = useState(null);


   useEffect( async () => {
      if(!week){
         const weekData = await getWeek();
         setWeek(weekData);
      }
      console.log(team)
      if (!team && week) {
         const teams = await getTeamsAtWeek(week);
         const boxScore = await getWeekBoxScore(week);
         let teamFound = teams.find(t => teamId == t.id);
         console.log(teamFound)
         const matchup = boxScore.find(m => {
            return m.homeTeamId == teamId || m.awayTeamId == teamId;
         })
         const bst = matchup.awayTeamId == teamId ? matchup.awayRoster : matchup.homeRoster
         setBoxScoreTeam(bst)
         setTeam(teamFound)
      }
   }, [team, teamId, week])
      

   
   if(!team || !boxScoreTeam) return (
      <Layout>
         <Link href="/ffb/ffb?setPanelTo=1" sx={{"margin-bottom":"10px"}}>
            <a>← Back to Season</a>
         </Link>
         <Typography variant="h4">Loading...</Typography>
      </Layout>
   )



   return (
      <Layout>
         <div className="team">
         <Link href="/ffb/ffb?setPanelTo=1" sx={{"margin-bottom":"10px"}}>
            <a>← Back to Season</a>
         </Link>
            <Card>
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
                           Scored: {team.pointsFor} - Scored Against: {team.pointsAgainst}
                        </Typography>
                        <Typography component="p">
                           playoff seed: {team.playoffSeed}
                        </Typography>
                     </Box>
                  </Box>
               </CardContent>
            </Card>
            <TeamRoster roster={team.roster} boxScoreTeam={boxScoreTeam}/>
         </div>
      </Layout>
   )
}
function usePrevious(value) {  
   const ref = useRef();
   useEffect(() => {
     ref.current = value;
   });
   return ref.current;
 }