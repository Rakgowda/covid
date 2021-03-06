import React, { useState, useEffect } from 'react';
import virus from "../images/Corona.svg"
import { makeStyles } from '@material-ui/core/styles';
import Tracking from './TrackingLive'
import {useSelector,useDispatch} from "react-redux"
import fetchCovid from "../redux/getCovidlivetracking/covidJsonAction"
import fetchCovidDeaths from "../redux/coviddeathtracking/covidDeathAction"
import fetchCovidRecovered from "../redux/covidrecovered/covidRecoveredAction"
import Typography from '@material-ui/core/Typography';
import GlobalTracking from "./globalTracking"
import ControlledExpansionPanels from "./table.js"

import StateList from "./staelist"
import { Tween, Timeline } from 'react-gsap';
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize:30,
    letterSpacing:10,
   textAlign:"center"
  },
  images:{
      width:50,
      height:40,
     

  },
  cardItems:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center"

      
  },
  
}));

function Header(params) {
    const classes = useStyles();

    const covidTrackingstate = useSelector(state=>state.reducer)
    // const covidDeathTrackingstate = useSelector(state=>state.CovidDeathreducer)
    // const covidecoveredTrackingstate = useSelector(state=>state.CovidRecoveredreducer)

    
    
    const covidTrackingDispatch = useDispatch();
//     const covidDeathTrackingDispatch = useDispatch();
//     const covidRecoveredTrackingDispatch = useDispatch();
// covidDeathTrackingDispatch




    useEffect(() => {
        covidTrackingDispatch(fetchCovid());
        // covidDeathTrackingDispatch(fetchCovidDeaths());<MiniLIne></MiniLIne>
        
    }, [])
    return(
            <React.Fragment>
                 <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={1}>
                <h1 className={classes.root}>{"INDIA COVID19"}<img className={classes.images} src={virus} alt="virus"></img>{" LIVE TRACKING"}</h1>
                </Tween>

            
                 

                
                <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={2}>

                 <p style={{textAlign:"center",color:"#21bf73"}} className="font-weight-normal">
          Last Update at {covidTrackingstate.data.statewise?
          moment(covidTrackingstate.data.statewise[0].lastupdatedtime.split(" ")[0], 'DD/MM/YYYY').format("Do MMM")+
          ", "+covidTrackingstate.data.statewise[0].lastupdatedtime.split(" ")[1]+" IST ["+moment(covidTrackingstate.data.statewise[0].lastupdatedtime.split(" ")[1], 'hh:mm:ss').fromNow()+"]"
          
          :"..."}
        </p>
        </Tween>
        
<StateList></StateList>


<Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={4}>

<h3 style={{textAlign:"center"}}> India Live COVID19 Tracking</h3>
</Tween>

            <br></br>
            <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={4}>
                 <div className={classes.cardItems} >

                 <Tracking key="1" cardColor={"#FF8D4E"} cardTitle={"Total"} linedata={covidTrackingstate.data.cases_time_series?covidTrackingstate.data.cases_time_series.map(d=>d.totalconfirmed):""} data={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].confirmed:"..."} increased={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].deltaconfirmed:"..."} />
                 <Tracking key="2" cardColor={"#0779e4"} cardTitle={"Active"} linedata={covidTrackingstate.data.cases_time_series?covidTrackingstate.data.cases_time_series.map(d=>d.totalconfirmed-d.totaldeceased-d.totalrecovered):""} data={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].active:"..."} increased={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].deltaconfirmed-covidTrackingstate.data.statewise[0].deltadeaths-covidTrackingstate.data.statewise[0].deltarecovered:"..."}/>
                 <Tracking key="2" cardColor={"#FE4F4F"} cardTitle={"Death"} linedata={covidTrackingstate.data.cases_time_series?covidTrackingstate.data.cases_time_series.map(d=>d.totaldeceased):""} data={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].deaths:"..."} increased={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].deltadeaths:"..."}/>
                 <Tracking key="3" cardColor={"#2DBF56"} cardTitle="Recover" linedata={covidTrackingstate.data.cases_time_series?covidTrackingstate.data.cases_time_series.map(d=>d.totalrecovered):""} data={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].recovered:"..."} increased={covidTrackingstate.data.statewise?covidTrackingstate.data.statewise[0].deltarecovered:"..."} />
                 </div>
                 
                 </Tween>
                 <br></br>
<Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={4.5}>

                 <h3 style={{textAlign:"center"}}>State Wise</h3>
                 <p style={{textAlign:"end"}}> <span className="badge badge-info">Click on state for more info</span></p>
                </Tween>
                 
                 

                 <ControlledExpansionPanels />

            </React.Fragment>
    )
}

function Dateformate(date){
    let d = date.split("T")
    return d[0]+" "+d[1].split(".")[0]
}

export default Header;
