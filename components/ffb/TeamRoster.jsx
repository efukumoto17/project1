import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { sortRoster } from "../../utils/sortRoster"
import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';
import { margin } from '@mui/system';

export default function TeamRoster({roster, boxScoreTeam}) {
   const [players, setPlayers] = useState(null);
   useEffect(() => {
      let mergedRoster = roster.map((player, index) => {
         return {
            ...player,
            ...boxScoreTeam[index]
         }
      });
      setPlayers(sortRoster(mergedRoster));
   }, [roster, boxScoreTeam]);

   return (
      <div>
      {players && players.map(player => (
         <Player player={player} /> 
      ))}
      </div>
   )
}

const Player = ({player}) => {
   return (
      <Card sx={{margin:"5px"}}>
         <CardContent>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography width={"50%"} variant="h6">{player.fullName}</Typography>
            <Box display="flex" width={"50%"}>
            <Typography flexGrow={1} variant="subtitle1">{player.position}</Typography>
            <Typography flexGrow={1} variant="body1">{player.proTeamAbbreviation}</Typography>
            <Typography flexGrow={1} variant="body1">
               {calculateProjectedPts(player.projectedPointBreakdown, player.projectedRawStats, player.defaultPosition)}
            </Typography>
            </Box>
            </Box>
         </CardContent>
      </Card>
   )
}

const calculateProjectedPts = (rawProjectedPts, rawProjectedStats, pos) => {
   let total =0;
   if(rawProjectedPts)
      Object.keys(rawProjectedPts).forEach(key => {
         if (typeof rawProjectedPts[key] === 'number') {
            total += rawProjectedPts[key];
         }
      })
   Object.keys(rawProjectedStats).forEach(key => {
      if (key === "rushingYards"  || key === "receivingYards") {
         total += rawProjectedStats[key] * 0.1;
      }
      if(pos === "TQB" && key === "passingYards") {
         total += rawProjectedStats[key] * 0.04;
      }
   })
   return Number.parseFloat(total).toFixed(2);
}