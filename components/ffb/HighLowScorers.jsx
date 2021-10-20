import TeamWeek from "./TeamWeek"


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function HighLowScorers({boxScore, findTeam}) {
   let high = {id: null, score: 0, roster: null, team: null}
   let low = {id: null, score: 400, roster: null, team: null}
   boxScore.forEach(matchup => {
      if (matchup.homeScore > high.score) {
         high.score = matchup.homeScore
         high.id = matchup.homeTeamId
         high.roster = matchup.homeRoster
      }
      if (matchup.awayScore > high.score) {
         high.score = matchup.awayScore
         high.id = matchup.awayTeamId
         high.roster = matchup.awayRoster
      }
      if (matchup.homeScore < low.score) {
         low.score = matchup.homeScore
         low.id = matchup.homeTeamId
         low.roster = matchup.homeRoster
      }
      if (matchup.awayScore < low.score) {
         low.score = matchup.awayScore
         low.id = matchup.awayTeamId
         low.roster = matchup.awayRoster
      }
   })
   
   high.team = findTeam(high.id)
   low.team = findTeam(low.id)
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h5">Highest Scoring Team</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <TeamWeek team={high.team} roster={high.roster} score={high.score}/>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>   
               <Typography variant="h5">Lowest Scoring Team</Typography>  
            </AccordionSummary>
            <AccordionDetails>
               <TeamWeek team={low.team} roster={low.roster} score={low.score}/>
            </AccordionDetails>
         </Accordion>
      </div>
   )
}