export const sortLowToHigh  = (boxScore) => {
   return boxScore.sort((a, b) => {
      return a.awayScore + a.homeScore - b.awayScore - b.homeScore;
   });
}
export const sortHighToLow = (boxScore) => {
   return boxScore.sort((a, b) => {
      return b.awayScore + b.homeScore - a.awayScore - a.homeScore;
   });
}
export const lowestDiff = (boxScore) => {
   return boxScore.sort((a, b) => {
      return Math.abs(a.awayScore - a.homeScore) - Math.abs(b.awayScore - b.homeScore);
   });
}
export const highestDiff = (boxScore) => {
   return boxScore.sort((a, b) => {
      return Math.abs(b.awayScore - b.homeScore) - Math.abs(a.awayScore - a.homeScore);
   });
}