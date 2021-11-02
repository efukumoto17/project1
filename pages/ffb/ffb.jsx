import Layout from "../../components/layout"
import WeeklyView from "../../components/ffb/WeeklyView"
import SeasonView from "../../components/ffb/SeasonView"

import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useRouter } from "next/router";


function TabPanel(props) {
   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`simple-tabpanel-${index}`}
       aria-labelledby={`simple-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box sx={{ p: 3 }}>
           <Typography>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }
 
 TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
 };
 
 function a11yProps(index) {
   return {
     id: `simple-tab-${index}`,
     'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default function ffb() {
   const [panel, setPanel] = useState(0)
   const [team, setTeam] = useState(null)
   const router = useRouter()
   const {setPanelTo} = router.query
   const prevPanel = usePrevious(panel)

   useEffect(() => {
      if (panel !== setPanelTo && setPanelTo) {
         setPanel(parseInt(setPanelTo))
      }
   }, [setPanelTo, panel, prevPanel])

   const handlePanel = (event, newVal) => {
      setPanel(newVal)
   }

   return (
      <Layout>
         <div>
            <h1>Fantasy Football</h1>
            <Box sx={{margin:"10px"}}>
               <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <Tabs value={panel} onChange={handlePanel} aria-label="basic tabs example">
                        <Tab label="Weekly View" {...a11yProps(0)} />
                        <Tab label="Season View" {...a11yProps(1)} />
                     </Tabs>
                  </Box>
                  <TabPanel value={panel} index={0}>
                     <WeeklyView/>
                  </TabPanel>
                  <TabPanel value={panel} index={1}>
                     <SeasonView />
                  </TabPanel>
               </Box>
            </Box>
         </div>
      </Layout>
   )
}

function usePrevious(value) {  
   const ref = useRef();
   useEffect(() => {
     ref.current = value;
   });
   return ref.current;
 }