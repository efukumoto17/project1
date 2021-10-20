import Layout from "../../components/layout"
import { getWeekBoxScore, getTeamsAtWeek, getLeagueInfo } from "../../utils/espnClient"
import Matchup from "../../components/ffb/Matchup"
// import TeamWeek from "../../components/ffb/TeamWeek"
import HighLowScorers from "../../components/ffb/HighLowScorers"
import HighLowScoringMatchup from "../../components/ffb/HighLowScoringMatchup"

import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function ffb() {
   const [boxScore, setBoxScore] = useState(null)
   const [teamsAtWeek, setTeamsAtWeek] = useState(null)
   const [league, setLeague] = useState(null)
   const [week, setWeek] = useState(1)
   let weeks = []
   for(let i = 1; i <= 14; i++){
      weeks.push(<MenuItem key={i + "week"} value={i}>Week {i}</MenuItem>) 
   }
   useEffect(() => {
      getLeagueInfo().then(res => {
         console.log(res)
         setLeague(res)

         console.log(weeks)
      })
      getWeekBoxScore(week || 1).then(data => {
         console.log(data)
         setBoxScore(data)
      });

      getTeamsAtWeek(week || 1).then(data => {
         console.log(data)
         setTeamsAtWeek(data)
      });
   }, [getWeekBoxScore, getTeamsAtWeek, getLeagueInfo, week])

   let findTeam = (teamId) => {
      return teamsAtWeek.find(team => team.id == teamId)
   }

   let handleWeekChange = (e) => {
      setWeek(e.target.value)
      getWeekBoxScore(e.target.value).then(data => {
         console.log(data)
         setBoxScore(data)
      });

      getTeamsAtWeek(e.target.value).then(data => {
         console.log(data)
         setTeamsAtWeek(data)
      });
   }

   // let HighestScore = () => {
   //    let high = {id: null, score: 0, roster: null, team: null}
   //    let low = {id: null, score: 400, roster: null, team: null}
   //    boxScore.forEach(matchup => {
   //       if (matchup.homeScore > high.score) {
   //          high.score = matchup.homeScore
   //          high.id = matchup.homeTeamId
   //          high.roster = matchup.homeRoster
   //       }
   //       if (matchup.awayScore > high.score) {
   //          high.score = matchup.awayScore
   //          high.id = matchup.awayTeamId
   //          high.roster = matchup.awayRoster
   //       }
   //       if (matchup.homeScore < low.score) {
   //          low.score = matchup.homeScore
   //          low.id = matchup.homeTeamId
   //          low.roster = matchup.homeRoster
   //       }
   //       if (matchup.awayScore < low.score) {
   //          low.score = matchup.awayScore
   //          low.id = matchup.awayTeamId
   //          low.roster = matchup.awayRoster
   //       }
   //    })
      
   //    high.team = findTeam(high.id)
   //    low.team = findTeam(low.id)
   //    return (
   //       <div>
   //          <div>
   //             <Typography variant="h4">Highest Scoring Team</Typography>
   //             <TeamWeek team={high.team} roster={high.roster} score={high.score}/>
   //          </div>
   //          <div>
   //             <Typography variant="h4">Lowest Scoring Team</Typography>
   //             <TeamWeek team={low.team} roster={low.roster} score={low.score}/>
   //          </div>
   //       </div>
   //    )
   // }



   return (
      <Layout>
         <div>
            <h1>Fantasy Football project</h1>
            <FormControl>
               <InputLabel id="demo-simple-select-label">Week</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={week || 1}
                  onChange={handleWeekChange}>
                     {league && console.log(league)}
                  {weeks}
                  {console.log(weeks)}
               </Select>
            </FormControl>
            <h2>Matchups</h2>
            {boxScore && teamsAtWeek && boxScore.map(matchup => {
               console.log(matchup.homeTeamId  + " " + matchup.awayTeamId)
               let homeTeam = findTeam(matchup.homeTeamId)
               let awayTeam = findTeam(matchup.awayTeamId)
               return <Matchup key={matchup} matchup={matchup} homeTeam={homeTeam} awayTeam={awayTeam}/>
            })}
            <h2>High/Low Scorers</h2>
           {boxScore && teamsAtWeek &&  
            <HighLowScorers boxScore={boxScore} findTeam={findTeam}/>}
            <h2>High/Low Scoring Matchups</h2>
           {boxScore && teamsAtWeek &&  
            <HighLowScoringMatchup boxScore={boxScore} findTeam={findTeam}/>}
         </div>
      </Layout>
   )
}