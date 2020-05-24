import React, {useEffect, useRef, useState} from 'react';
import {useSelector,useDispatch} from "react-redux"
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        
      },
    },
    button:{
      "text-transform": "none"
    }
  }));
export default function MiniLIne(params){
    const miniLine = useRef();
  
    const classes = useStyles();

    d3.select("#line svg").selectAll("path").remove()
  
    
   
    const colorData={confirmed:"#FF8D4E",active:"#0779e4",deaths:"#FE4F4F",recovered:"#2DBF56"}
   
    
    let linedata =params.linedata;
      
     
      useEffect(()=>{
        
    //     const his = params.barchart.Deathdata.data.history;
  
    //     const d = his.map((f)=>f.statewise)
    //     const day = his[his.length-1].day;
  
     
  
    //     const hd=d.map(e=>e.filter(f=>f.state===params.stateRealName).map((m,i)=>m["confirmed"]))
         let data1 = linedata.map((e,i)=>{
         if(i!==0)
         {
           return e-linedata[i-1]
         }
         return e
       })
       
    //    data1 = data1.splice(data1.length-20)
        
       console.log(data1);
        const svg = d3.select(miniLine.current)
    
    
        const margin = {t:5,r:5,l:5,b:5}
        
        const width = +svg.attr('width');
        const height = +svg.attr('height');
    
        const graphWidth = width - margin.l - margin.r;
        const graphHeight = height - margin.t - margin.b;
    
        const graph = svg.append("g")
        .attr("width",graphWidth)
        .attr("height",graphHeight)
        .attr("transform",`translate(${(margin.l)}, ${margin.t})`)
    

        const max = d3.max(data1,d=>d)
        const min = d3.min(data1,d=>d)

        // this for lenear height
    
        const yScale = d3.scaleLinear().domain([0,max]).range([graphHeight,0])
        
        // this for band width for x axis
        const xScale = d3.scaleLinear().domain([0,(data1.length-1)]).range([0,graphWidth])
                           
        const t = d3.transition().duration(3000)
 
   
    var lines = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX)

  
    var path = graph.append("path")
    .datum(data1) // 10. Binds data to the line 
    .attr("stroke", "white") // Assign a class for styling 
    .attr("fill", "none")
    .attr("d",lines)
 
  
  
    var totalLength = path.node().getTotalLength();
    console.log("total : "+totalLength);

// Set Properties of Dash Array and Dash Offset and initiate Transition
path.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
  .transition() // Call Transition Method
	.duration(5000) // Set Duration timing (ms)
	.ease(d3.easeLinear) // Set Easing option
	.attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition
        
   
    
      })
    
      
  
      return (
          <div >
  
  <svg id="#line" style={{marginTop:5}}
          ref={miniLine}
          width="90"
          height="60"
          preserveAspectRatio="xMidYMid meet"
        >
           
          
        </svg>
     
      </div>
      )
  }
   
  
  
  