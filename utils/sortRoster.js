let rosterVals = {
   "QB": 1,
   "RB": 2,
   "WR": 3,
   "TE": 4,
   "RB/WR/TE": 5,
   "DP": 6,
   "D/ST": 7,
   "K": 8,
   "Bench": 9,
   "IR": 10,
}

export const sortRoster = (roster) => {
   return roster.sort((a, b) => {
      return rosterVals[a.position] - rosterVals[b.position];
   })
}