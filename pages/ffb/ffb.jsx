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


   return (
      <Layout>
         <div>
            <h1>Fantasy Football project</h1>
            <h2>Matchups</h2>
            {boxScore && teamsAtWeek && boxScore.map(matchup => {
               let findTeam = (teamId) => {
                  return teamsAtWeek.find(team => team.id == teamId)
               }
               console.log(matchup.homeTeamId  + " " + matchup.awayTeamId)
               let homeTeam = findTeam(matchup.homeTeamId)
               let awayTeam = findTeam(matchup.awayTeamId)
               return <Matchup key={matchup} matchup={matchup} homeTeam={homeTeam} awayTeam={awayTeam}/>
            })}
         </div>
      </Layout>
   )
}