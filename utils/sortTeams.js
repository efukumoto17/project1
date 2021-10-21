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