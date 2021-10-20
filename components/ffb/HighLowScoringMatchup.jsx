import Matchup from "./Matchup"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function HighLowScoringMatchup({boxScore, findTeam}) {
   let high = {idx: null, score: 0, awayId: null, homeId: null};
   let low = {idx: null, score: 1000, awayId: null, homeId: null}
   boxScore.forEach((matchup, i) => {
      if (matchup.homeScore + matchup.awayScore > high.score) {
         high.score = matchup.homeScore + matchup.awayScore
         high.idx = i
         high.awayId = matchup.awayTeamId
         high.homeId = matchup.homeTeamId
      }
      if (matchup.homeScore + matchup.awayScore < low.score) {
         low.score = matchup.homeScore + matchup.awayScore
         low.idx = i
         low.awayId = matchup.awayTeamId
         low.homeId = matchup.homeTeamId
      }
   })
   console.log(boxScore)
   console.log(high)
   console.log(low)
   return (
      <div>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">High Scoring Matchup - {high.score}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Matchup 
               matchup={boxScore[high.idx]} 
               homeTeam={findTeam(high.homeId)}
               awayTeam={findTeam(high.awayId)}/>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">Lowest Scoring Matchup - {low.score}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Matchup
                  matchup={boxScore[low.idx]}
                  homeTeam={findTeam(low.homeId)}
                  awayTeam={findTeam(low.awayId)}/>
            </AccordionDetails>
         </Accordion>
      </div>
   )
}