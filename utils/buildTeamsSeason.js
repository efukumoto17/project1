import { getTeamsAtWeek, getWeekBoxScore } from './espnClient';
export const buildTeamsSeason = async () => {
   let weeks = 14;
   let teams = {}
   for (let i = 0; i < weeks; i++) {
      // let boxScore = await getWeekBoxScore(i + 1);
      // if(boxScore[0].homeScore === 0)
      //    break
      // boxScore.forEach((box, index) => {
      //    let away = teams[box.awayTeamId] || {}
      //    let home = teams[box.homeTeamId] || {}
      //    away.wins = away.wins ? away.wins : 0
      //    home.wins = home.wins ? home.wins : 0
      //    away.losses = away.losses ? away.losses : 0
      //    home.losses = home.losses ? home.losses : 0
      //    away.ties = away.ties ? away.ties : 0
      //    home.ties = home.ties ? home.ties : 0
      //    away.pointsFor = away.pointsFor ? away.pointsFor : 0
      //    home.pointsFor = home.pointsFor ? home.pointsFor : 0
      //    away.pointsAgainst = away.pointsAgainst ? away.pointsAgainst : 0
      //    home.pointsAgainst = home.pointsAgainst ? home.pointsAgainst : 0
      //    box.homeScore === 0 || box.homeScore > box.awayScore ? home.wins++ : away.wins++
      //    box.homeScore === 0 || box.homeScore < box.awayScore ? home.losses++ : away.losses++
      //    if(box.homeScore === box.awayScore) {
      //       home.ties++  
      //       away.ties++
      //    }
      //    home.pointsFor += box.homeScore
      //    home.pointsAgainst += box.awayScore
      //    away.pointsFor += box.awayScore
      //    away.pointsAgainst += box.homeScore
      //    teams[box.awayTeamId] = away
      //    teams[box.homeTeamId] = home
      // })
   }
   let week = await getTeamsAtWeek(1)
   week.forEach(team => {
      let teamObj = teams[team.id] || {}
      teamObj.logoURL = team.logoURL
      teamObj.name = team.name
      teamObj.wins = team.wins
      teamObj.losses = team.losses
      teamObj.ties = team.ties
      teamObj.pointsFor = team.regularSeasonPointsFor
      teamObj.pointsAgainst = team.regularSeasonPointsAgainst
      teamObj.playoffSeed = team.playoffSeed
      teams[team.id] = teamObj
   })

   return teams
}