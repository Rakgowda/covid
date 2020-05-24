import React, {useEffect, useRef, useState} from 'react';
import {useSelector,useDispatch} from "react-redux"
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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


export default function Stateinfochart(params){
  const svgRef = useRef();

  const classes = useStyles();
  d3.selectAll("rect").remove();
  d3.selectAll("text").remove();
  const [caseType, setCaseType] = React.useState('confirmed');
 
  const colorData={confirmed:"#FF8D4E",active:"#0779e4",deaths:"#FE4F4F",recovered:"#2DBF56"}
 
  function handleChange(e){
    if(caseType!==e)
    {
      d3.selectAll("rect").remove();
      d3.selectAll("text").remove();
      setCaseType(e);
    }
    
  };

  
    
    
    const covidTrackingstate = useSelector(state=>state.reducer)
    useEffect(()=>{
      
      const his = params.barchart.Deathdata.data.history;

      const d = his.map((f)=>f.statewise)
      const day = his[his.length-1].day;

   

      const hd=d.map(e=>e.filter(f=>f.state===params.stateRealName).map((m,i)=>m[caseType]))
      let data1 = hd.map((e,i)=>{
       if(i!==0)
       {
         return e-hd[i-1]
       }
       return e
     })
      data1 = data1.splice(data1.length-5)
     
      
  
      const svg = d3.select(svgRef.current)
  
  
      const margin = {t:20,r:20,l:40,b:40}
      
      const width = +svg.attr('width');
      const height = +svg.attr('height');
  
      const graphWidth = width - margin.l - margin.r;
      const graphHeight = height - margin.t - margin.b;
  
      const graph = svg.append("g")
      .attr("width",graphWidth)
      .attr("height",graphHeight)
      .attr("transform",`translate(${(margin.l)}, ${margin.t})`)
      
  
      const txtt = svg.append("g")
      .attr("width",graphWidth)
      .attr("height",graphHeight)
      .attr("transform",`translate(${(margin.l)}, ${margin.t})`)
  
  // this  create group for x and y axis
      const xAxisGroup = graph.append("g")
      .attr("transform",`translate(0,${graphHeight})`)
      const yAxisGroup = graph.append("g")
  
  
  
      var circles = graph.selectAll("rect").data(data1);
      var txt = txtt.selectAll("text").data(data1);
      const min = d3.min(data1,d=>d)
      const max = d3.max(data1,d=>d)
      // this for lenear height
  
      const y = d3.scaleLinear().domain([0,max]).range([graphHeight,0])
      
      // this for band width for x axis
      const x = d3.scaleBand().domain(data1.map((d,i)=>i)).range([0,graphWidth]).paddingInner(.2).paddingOuter(.2)
                        
  const t = d3.transition().duration(500)
  
  const w = x.bandwidth();
 
  
  
  txt.enter().append("text")
  .attr("x",(d,i)=>x(i)+(w/2))
  .attr("y",graphHeight)
  .transition(t)
  .attr("y",d=>y(d)-10)
  .attr("font-size", "11px")
  .style("fill", colorData[caseType])
  // .attr("transform",`translate(${(-x.bandwidth)}, ${0})`)
  .attr('text-anchor', 'middle')
  .text(d=>d)

  txt.enter().append("text")
  .attr("x",(d,i)=>x(i)+(w/2))
  .attr("y",graphHeight+10)
 
  .style("fill", colorData[caseType])
  .attr("font-size", ".6em")
  // .attr("transform",`translate(${(-x.bandwidth)}, ${0})`)
  .attr('text-anchor', 'middle')
  .text((d,i)=>moment(day, 'YYYY-MM-DD').subtract(4-i, "days").format("MMM Do"))
  



      circles.attr("width",x.bandwidth)
      .attr("height",0)
      .attr("fill", colorData[caseType])
      .attr("x",(d,i)=>x(i))
      // .attr("y",graphHeight)
      // .transition(t)
      // .attr("y",d=>y(d))
      // .attr("height",d=>graphHeight-y(d))
      
      const widthTween =(d)=>{
  
        const i = d3.interpolate(0,x.bandwidth());
  
        return function(t)
        {
          return i(t)
        }
      }
      
    
  
      circles.enter().append("rect")
      .attr("width",x.bandwidth)
      .attr("fill", colorData[caseType])
      .attr("x",(d,i)=>x(i))
      .attr("y",graphHeight)
      .merge(circles)
      .transition(t)
      // .attrTween('width',widthTween)
      .attr("y",d=>y(d))
      .attr("height",d=>graphHeight-y(d))
      
      // const xAxis = d3.axisBottom(x)
      // const yAxis = d3.axisLeft(y).ticks(4)
      // xAxisGroup.call(xAxis)
      // yAxisGroup.call(yAxis)
  
 
  
    })
  
    

    return (
        <div >

<svg style={{display: "block",margin:"auto"}}
        ref={svgRef}
        width="300"
        height="250"
        id="#barchart"
        
        preserveAspectRatio="xMidYMid meet"
      >
         
        
      </svg>
      <div className={classes.root}>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button className={classes.button} onClick={()=>handleChange("confirmed")}>Confirm</Button>
        <Button className={classes.button} onClick={()=>handleChange("active")}>Active</Button>
        <Button className={classes.button} onClick={()=>handleChange("deaths")}>Death</Button>
        <Button className={classes.button} onClick={()=>handleChange("recovered")}>Recover</Button>

      </ButtonGroup>
    </div>
    </div>
    )
}
 


