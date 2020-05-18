import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import fetchglobalCovid from "../redux/globalTracking/globalTrackingAction"

import { Tween, Timeline } from 'react-gsap';
import Cholopleth from "./choropleth"
import { Switch, Route,Link,NavLink,BrowserRouter as Router} from 'react-router-dom'
import Stateinfochart from "./stateinfochart"
import fetchCovidDeaths from "../redux/coviddeathtracking/covidDeathAction"

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};  

export default function Linechart(params){
  const covidDeathTrackingstate = useSelector(state=>state.CovidDeathreducer);
    const covidDeathTrackingDispatch = useDispatch();
    
  const covidStaTrackingstate = useSelector(state=>state.globalreducer)
  const covidSateTrackingDispatch = useDispatch();

  
  useEffect(() => {
    covidSateTrackingDispatch(fetchglobalCovid());
    covidDeathTrackingDispatch(fetchCovidDeaths());
   
}, [])


    const color = ["#dd2c00",
    "#ff5722","#ff1e56",
    '#FF6384','#36A2EB',
    '#FFCE56',"#f0a500",
    "#363062","#856c8b",
    "#efa8e4","#442727",
    "#0f4c81","#8db1ab",
    "#fb7b6b",
    "#018383","#bac7a7",
    "#e4508f",
    "#697c37","#95389e",
    "#005082","#e4508f",
    "#e7f0c3","#4f98ca",
    "#a0c334","#e6a400",
    "#5d5d5d","#d1eecc",
    "#ff8080","#f34573",
    "#6384b3","#bdf2d5",
    "#454d66","#560d0d",
    "#ffb677","#f77fee",
    "#005082"



]

let increcon = {}
let col = []

let getHeatMap = []
const dyheight = window.innerWidth>1000?100:200

const data = {
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [
		
		],
		hoverBackgroundColor: [
		]
  }]
};


   

      if(covidStaTrackingstate.data[params.statename]!== undefined)
      {
        Object.keys(covidStaTrackingstate.data[params.statename].districtData).sort((a,b)=>covidStaTrackingstate.data[params.statename].districtData[b].confirmed - covidStaTrackingstate.data[params.statename].districtData[a].confirmed).map((keyname,index)=>{
            let dis = covidStaTrackingstate.data[params.statename].districtData[keyname];        
            if(dis.delta.confirmed>0)
            {
              let key = keyname;
              increcon[key] = {confirmed:dis.delta.confirmed,index:col.length}
              
              col = [...col,color[index]]
              
            }
            
            getHeatMap=[...getHeatMap,{id:keyname,District:keyname, value: dis.confirmed,color:color[index]}]

            
            
                    // data.labels = [...data.labels,keyname];
                    // data.datasets[0].data = [...data.datasets[0].data,dis.confirmed]
                    // data.datasets[0].backgroundColor=[...data.datasets[0].backgroundColor,color[index]]
                    // data.datasets[0].hoverBackgroundColor=[...data.datasets[0].hoverBackgroundColor,color[index]]

        })
      }
      
    return (
  
        <div style={{marginBottom:10}}>
              {covidDeathTrackingstate.Deathdata.data !==undefined?(
               <React.Fragment>
                 <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={1.5}>

                  <h4 className="text-center" style={{color:"#758184"}}>Last 5 days chart</h4>
                  <Stateinfochart stateRealName={params.statename} barchart={covidDeathTrackingstate}></Stateinfochart>
        </Tween>
                 
               </React.Fragment>
              ):""}
              
               
               <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={1.5}>

               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <h2 style={{textAlign:"center"}} style={{margin: 10}}>District Map</h2>
               {/* <Link to={"/info/"+params.statename} style={{margin: 10}} >click</Link> */}
               </div>
        
        </Tween>
        <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={1.5}>

         <div style={{display:"block",textAlign:"center"}}>

        {increcon?
          Object.keys(increcon).sort((a,b)=>increcon[b].confirmed - increcon[a].confirmed).map((k,i)=>{
          return  <span className="badge badge-light" style={{color:"white",fontSize:10,margin:5,background:col[increcon[k].index]}}>{k}<ArrowUpwardIcon style={{margin:3,fontSize:10}}></ArrowUpwardIcon>{increcon[k].confirmed}</span>
          }
        ):""}
        </div>
        </Tween>

   
      
        
        {covidStaTrackingstate.data[params.statename]? 
          ( 
<Cholopleth HeathMap = {getHeatMap} statename={params.statename.toLowerCase().replace(/ +/g, "")} stateRealName={params.statename}/>

          
          )
         :""}
         
      </div>
    );
  
}

