import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"

import fetchCovidDeaths from "../redux/coviddeathtracking/covidDeathAction"
import Tracking from './TrackingLive'
import { Tween, Timeline } from 'react-gsap';
import fetchglobalCovid from "../redux/globalTracking/globalTrackingAction"



function StateChart(params){
 
    const covidTrackingstate = useSelector(state=>state.reducer)

    const covidDeathTrackingstate = useSelector(state=>state.CovidDeathreducer)

  const covidDeathTrackingDispatch = useDispatch();


    useEffect(() => {
        
        covidDeathTrackingDispatch(fetchCovidDeaths());
    }, [])
    return (
        <React.Fragment>
             <Tween ease="Back.easeIn"  from={{opacity:0,y: '-10px'}} to={{opacity:1,y: '0px'}} duration={3.5}>     
             
         <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"   
        }} >

    

{ covidTrackingstate.data.statewise && covidDeathTrackingstate.Deathdata.data !==undefined?
     
     covidTrackingstate.data.statewise.filter((a)=>a.state == params.statename).map((state,index)=>{
  
 
 return (
    
    <React.Fragment>
       
        <Tracking key={state.confirmed} linedata={covidDeathTrackingstate.Deathdata.data.history.map(d=>d.statewise.filter(e=>e.state==params.statename).map(f=>f.confirmed)[0])} cardColor={"#FF8D4E"} cardTitle={"Total"} data={state.confirmed} increased={state.deltaconfirmed}> </Tracking>
       
        <Tracking key={state.active} cardColor={"#0779e4"} linedata={covidDeathTrackingstate.Deathdata.data.history.map(d=>d.statewise.filter(e=>e.state==params.statename).map(f=>f.confirmed-f.deaths-f.recovered)[0])} cardTitle={"Active"} data={state.active} increased={state.deltaconfirmed-state.deltadeaths-state.deltarecovered}/>
    
    <Tracking key={state.deaths} cardColor={"#FE4F4F"} linedata={covidDeathTrackingstate.Deathdata.data.history.map(d=>d.statewise.filter(e=>e.state==params.statename).map(f=>f.deaths)[0])} cardTitle={"Death"} data={state.deaths} increased={state.deltadeaths}> </Tracking>
    <Tracking key={state.recovered} cardColor={"#2DBF56"} linedata={covidDeathTrackingstate.Deathdata.data.history.map(d=>d.statewise.filter(e=>e.state==params.statename).map(f=>f.recovered)[0])} cardTitle={"Recover"} data={state.recovered} increased={state.deltarecovered}> </Tracking>
   
   
    </React.Fragment>

   
   
   

 )}
):(

   <React.Fragment>

<Tracking key={"sc"} cardColor={"#FF8D4E"} cardTitle={"Total"} data={"..."} increased={0}> </Tracking>
    <Tracking key={"sa"} cardColor={"#0779e4"} cardTitle={"Active"} data={"..."} increased={0}> </Tracking>

<Tracking key={"sd"} cardColor={"#FE4F4F"} cardTitle={"Death"} data={"..."} increased={0}> </Tracking>
<Tracking key={"sr"} cardColor={"#2DBF56"} cardTitle={"Recover"} data={"..."} increased={0}> </Tracking>
   </React.Fragment>

 )}

        
        

        </div>
        </Tween>

       
   </React.Fragment>
        
    )
   

}

export default StateChart;
