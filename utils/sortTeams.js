export const sortHighLow = (teams)  => {
   return teams.sort((a, b) => {
      return b.score - a.score;
   })
}
export const sortLowHigh = (teams)  => {
   return teams.sort((a, b) => {
      return a.score - b.score;
   })
}
let projectionCategories = [
   "lostFumbles",
   "receiving2PtConversions",
   "receivingReceptions",
   "receivingTouchdowns",
   "rushing2PtConversions",
   "rushingTouchdowns",
   "defensive0PointsAllowed"
]

export const sortSeasonTeams = (teams) => {
   return teams.sort((a, b) => {
      return a.playoffSeed - b.playoffSeed;
   })
}

export const sortRecord = (teams) => {
   return teams.sort((a, b) => {
      return b.wins - a.wins;
   })
}
export const sortPointsFor = (teams) => {
   return teams.sort((a, b) => {
      return b.pointsFor - a.pointsFor;
   })
}
export const sortPointsAgainst = (teams) => {
   return teams.sort((a, b) => {
      return a.pointsAgainst - b.pointsAgainst;
   })
}