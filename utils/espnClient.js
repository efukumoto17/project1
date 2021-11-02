import { Client } from 'espn-fantasy-football-api/node.js'

const leagueId = '275797'
const seasonId = '2021'
const teamId = '4'
const espn_s2 = "AEAku9UzeJVjlbhLNwy56aZBLKR60XIceckyefWsVfMiD%2BEVDLPD%2Fy0cm%2FQz%2F07g9V9r3kVQx6NfSbpthJYosDsjVEg8FOC%2BkBrVCLQGB2ORGBOsZtnNZrCNw3ts2n0aRy6NE49PW0GB4u3MgAO5ez%2FdYUhBGX81oC7AiDumuZOrJCmkNJQxf7%2Fbya9mxdl3jVqNIrsnx6KvLhqbXVv5CdRagykdLI%2F%2BUvB2skPxpq0g6v3pi1bBdcRGI5Yza2zBeixijU6ADC5UyyJz8az5RIdq31%2BWlZdvQx9GRBhLA4cR0w%3D%3D";
const SWID = "{2E369BC9-1764-4D33-B69B-C91764AD33C9}"
const myClient = new Client({ 
   leagueId: leagueId,
 });
myClient.setCookies({ espnS2: espn_s2, SWID: SWID });

export const getWeekBoxScore = async (week) => {
  let boxScore = await myClient.getBoxscoreForWeek({ 
    seasonId: seasonId, 
    matchupPeriodId: week, 
    scoringPeriodId: week
  })
  
  return boxScore
}

export const getTeamsAtWeek = async (week) => {
  let teamsAtWeek = await myClient.getTeamsAtWeek({
    seasonId: seasonId,
    scoringPeriodId: week
  })
  return teamsAtWeek
}

export const getLeagueInfo = async () => {
  let leagueInfo = await myClient.getLeagueInfo({seasonId: seasonId})
  return leagueInfo
}

export const getFreeAgents = async () => {
  let freeAgents = await myClient.getFreeAgents({
    seasonId: seasonId,
    scoringPeriodId: 1,
  })
  return freeAgents
}

export const getWeek = async () => {
  let week = await getTeamsAtWeek(1)
  return week[0].wins + week[0].losses + week[0].ties
}
