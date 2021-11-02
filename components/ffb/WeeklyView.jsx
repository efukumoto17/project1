import Matchup from "../../components/ffb/Matchup"
import TeamWeek from "../../components/ffb/TeamWeek"
import {lowestDiff, highestDiff, sortLowToHigh, sortHighToLow} from "../../utils/sortMatchup"
import { sortHighLow, sortLowHigh } from "../../utils/sortTeams"
import { getWeekBoxScore, getTeamsAtWeek, getLeagueInfo } from "../../utils/espnClient"

import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const matchupSorts = [
   "Highest total score",
   "Lowest total score",
   "Highest differential",
   "Lowest differential"
]

const teamSorts = [
   "Highest total score",
   "Lowest total score"
]

export default function WeeklyView() {
   const [boxScore, setBoxScore] = useState(null)
   const [teamsAtWeek, setTeamsAtWeek] = useState(null)
   const [league, setLeague] = useState(null)
   const [week, setWeek] = useState(1)
   const [matchupSort, setMatchupSort] = useState(matchupSorts[0])
   const [teamSort, setTeamSort] = useState(teamSorts[0])
   const [teamsWeek, setTeamsWeek] = useState(null)

   let weeks = []
   const prevBoxScore = usePrevious(boxScore)
   const prevTeamsWeek = usePrevious(teamsWeek)

   let matchupSortCmps = []
   let teamSortCmps = []

   for (let i = 1; i <= 14; i++) {
      weeks.push(<MenuItem key={i + "week"} value={i}>Week {i}</MenuItem>) 
   }

   for (let i = 0; i < matchupSorts.length; i++) {
      matchupSortCmps.push(
       <MenuItem 
        key={i + "matchupSort"} 
        value={matchupSorts[i]}>
         {matchupSorts[i]}
       </MenuItem>)
   }
   for (let i = 0; i < teamSorts.length; i++) {
      teamSortCmps.push(
       <MenuItem 
        key={i + "teamSort"} 
        value={teamSorts[i]}>
         {teamSorts[i]}
       </MenuItem>)
   }

   let makeWeekTeams = () => {
      let teams = []
      for (let i = 0; i < boxScore.length; i++) {
         teams.push({
            roster: boxScore[i].homeRoster,
            teamId: boxScore[i].homeTeamId,
            score: boxScore[i].homeScore,
         })
         teams.push({
            roster: boxScore[i].awayRoster,
            teamId: boxScore[i].awayTeamId,
            score: boxScore[i].awayScore
         }) 
      }
      setTeamsWeek(teams)
   }

   useEffect(async () => {
      
      if(!teamsAtWeek){
         let leagueData = await getLeagueInfo()
         let teamsAtWeekData = await getTeamsAtWeek(week || 1)
         let boxScoreData = await getWeekBoxScore(week || 1)
         setLeague(leagueData)
         setTeamsAtWeek(teamsAtWeekData)
         setBoxScore(boxScoreData)
      }
      if(boxScore && prevBoxScore !== boxScore){
         makeWeekTeams()
         handleMatchupSort()
      }
      if(teamsWeek && prevTeamsWeek !== teamsWeek){
         handleTeamSort()
      }
   }, [ boxScore, teamsAtWeek, week])



   let findTeam = (teamId) => {
      return teamsAtWeek.find(team => team.id == teamId)
   }

   let handleWeekChange = async (e) => {
      setWeek(e.target.value)
      let boxScoreData = await getWeekBoxScore(e.target.value)
      let teamsAtWeekData = await getTeamsAtWeek(e.target.value)
      setTeamsAtWeek(teamsAtWeekData)
      setBoxScore(boxScoreData)
   }

   let handleTeamSort = (e) => {
      let newSort;
      if(e) {
         newSort = e.target.value
         setTeamSort(newSort)
      } else {
         newSort = teamSort
      }
      if(newSort === teamSorts[0]) {
         setTeamsWeek(sortHighLow(teamsWeek))
      } else {
         setTeamsWeek(sortLowHigh(teamsWeek))
      }
   }

   let handleMatchupSort = (e) => {
      let newSort;
      if(e){
         newSort = e.target.value
         setMatchupSort(newSort)
      } else {
         newSort = matchupSort
      }
      if(newSort === matchupSorts[0]){
         setBoxScore(sortHighToLow(boxScore))
      }
      if(newSort === matchupSorts[1]){
         setBoxScore(sortLowToHigh(boxScore))
      }
      if(newSort === matchupSorts[2]){
         setBoxScore(highestDiff(boxScore))
      }
      if(newSort === matchupSorts[3]){
         setBoxScore(lowestDiff(boxScore))
      }
   }

   return (
      <div>
         <Box sx={{margin:"10px"}}>
            <Box 
             display="flex" 
             justifyContent="center" 
             alignItems="center"
             margin="10px">
               <Box flexGrow={1}>
                  <Typography variant="h4">Weekly View</Typography>
               </Box>
               <FormControl>
                  <InputLabel id="demo-simple-select-label">Week</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={week || 1}
                     onChange={handleWeekChange}>
                     {weeks}
                  </Select>
               </FormControl>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
               <Box flexGrow={1}>
                  <Typography variant="h4">Matchups</Typography>
               </Box>
               <FormControl>
                  <InputLabel id="demo-simple-select-label">Matchup Sort</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={matchupSort}
                     onChange={handleMatchupSort}>
                     {matchupSortCmps}
                  </Select>
               </FormControl>
            </Box>
            {boxScore && teamsAtWeek && boxScore.map((matchup, i) => {
               return <Matchup 
               sort={matchupSort}
               key={i + "matchup"}
               matchup={matchup}
               homeTeam={findTeam(matchup.homeTeamId)} 
               awayTeam={findTeam(matchup.awayTeamId)}/>
            }) || <Typography>Loading...</Typography>}
         </Box>
         {console.log(teamsAtWeek)}
         {console.log(boxScore)}
         {console.log(league)}
         <Box sx={{margin:"10px"}}>
            <Box display="flex" justifyContent="center" alignItems="center">
               <Box flexGrow={1}>
                  <Typography variant="h4">Teams</Typography>
               </Box>
               <FormControl>
                  <InputLabel id="demo-simple-select-label">Team Sort</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={teamSort}
                     onChange={handleTeamSort}>
                     {teamSortCmps}
                  </Select>
               </FormControl>
            </Box>
            {teamsWeek && teamsWeek.map((team, i) => {
               return <TeamWeek
                  key={i + "team"}
                  roster={team.roster}
                  team={findTeam(team.teamId)}
                  score={team.score}
                  sort={teamSort}
                  />
            }) || <Typography>Loading...</Typography>}
         </Box>
      </div>
   )

}

function usePrevious(value) {  
   const ref = useRef();
   useEffect(() => {
     ref.current = value;
   });
   return ref.current;
 }