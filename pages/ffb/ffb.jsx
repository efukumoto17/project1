import Layout from "../../components/layout"
import { getWeekBoxScore, getTeamsAtWeek } from "../../utils/espnClient"
import Matchup from "../../components/ffb/Matchup"
import { useState, useEffect } from "react"


export default function ffb() {
   const [boxScore, setBoxScore] = useState(null)
   const [teamsAtWeek, setTeamsAtWeek] = useState(null)

   useEffect(() => {
      getWeekBoxScore(2).then(data => {
         console.log(data)
         setBoxScore(data)
      });

      getTeamsAtWeek(2).then(data => {
         console.log(data)
         setTeamsAtWeek(data)
      });
   }, [getWeekBoxScore, getTeamsAtWeek])

   let findTeam = (teamId) => {
      return teamsAtWeek.find(team => team.id == teamId)
   }

   let HighestScore = () => {
      let highestScore = 0
      let teamId = null
      let highestScoringTeam = null;
      boxScore.forEach(matchup => {
         if (matchup.homeScore > highestScore) {
            highestScore = matchup.homeScore
            teamId = matchup.homeTeamId
         }
         if (matchup.awayScore > highestScore) {
            highestScore = matchup.awayScore
            teamId = matchup.awayTeamId
         }
      })
      highestScoringTeam = findTeam(teamId)
      return (
         <div>
            <h2>Highest Scorer: {highestScoringTeam.name}</h2>
            <p>{highestScore}</p>
         </div>
      )
   }


   return (
      <Layout>
         <div>
            <h1>Fantasy Football project</h1>
            <h2>Matchups</h2>
            {boxScore && teamsAtWeek && boxScore.map(matchup => {
               
               console.log(matchup.homeTeamId  + " " + matchup.awayTeamId)
               let homeTeam = findTeam(matchup.homeTeamId)
               let awayTeam = findTeam(matchup.awayTeamId)
               return <Matchup key={matchup} matchup={matchup} homeTeam={homeTeam} awayTeam={awayTeam}/>
            })}
           {boxScore && teamsAtWeek &&  <HighestScore />}
         </div>
      </Layout>
   )
}