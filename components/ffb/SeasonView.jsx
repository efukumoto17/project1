import { buildTeamsSeason } from "../../utils/buildTeamsSeason"
import TeamSeason from "./TeamSeason"
import { getFreeAgents } from "../../utils/espnClient"
import { sortSeasonTeams, sortRecord, sortPointsFor, sortPointsAgainst } from "../../utils/sortTeams"

import { useState, useEffect, useRef } from "react"
import { Typography } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


const teamsSorts = [
   "Playoff Seeding",
   "Record",
   "Points For",
   "Points Against",
]

export default function SeasonView({ setTeam }) {
   const [season, setSeason] = useState(null)
   const [sort, setSort] = useState(teamsSorts[0])
   let sortCmps = []

   for(let i = 0; i < teamsSorts.length; i++) {
      sortCmps.push(
         <MenuItem value={teamsSorts[i]} key={i + "sort"}>{teamsSorts[i]}</MenuItem>
      )
   }

   useEffect( async () => {
      const seasonData = await buildTeamsSeason()
      let seasonListData = Object.keys(seasonData).map(key => { 
         return {... seasonData[key]}});
      seasonListData = sortSeasonTeams(seasonListData)
      setSeason(seasonListData)
      const freeAgents = await getFreeAgents()
   }, [])

   let handleSeasonSort = (e) => {
      let newSort;
      if(e) {
         newSort = e.target.value
         
      } else {
         newSort = sort
      }
      if(newSort === teamsSorts[0]) {
         setSeason(sortSeasonTeams(season))
      } else if(newSort === teamsSorts[1]) {
         setSeason(sortRecord(season))
      } else if(newSort === teamsSorts[2]) {
         setSeason(sortPointsFor(season))
      } else if(newSort === teamsSorts[3]) {
         setSeason(sortPointsAgainst(season))
      }
      setSort(newSort)
   }
   

   return (
      <div>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Box flexGrow={1}>
               <Typography variant="h4">Season View</Typography>
            </Box>
            <FormControl>
               <InputLabel id="demo-simple-select-label">Week</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  onChange={handleSeasonSort}>
                  {sortCmps}
               </Select>
            </FormControl>
         </Box>
         {season && <TeamSeason teams={season} setTeam={setTeam}/> ||
            <Typography variant="h5">Loading...</Typography>}
      </div>
   )
}
