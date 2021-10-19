
export default function Matchup({matchup, homeTeam, awayTeam}) {
   return (
      <div>
         <div className="matchup" id={matchup}>
            <h3>{awayTeam.name + " vs. " + homeTeam.name}</h3>
         </div>
     </div>
   )
}