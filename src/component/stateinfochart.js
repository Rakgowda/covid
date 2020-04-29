import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

export default function Stateinfochart(params){
    const svgRef = useRef();
    useEffect(()=>{
    const data1 = [100,200,300,400,1000];

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

// this  create group for x and y axis
        const xAxisGroup = graph.append("g")
        .attr("transform",`translate(0,${graphHeight})`)
        const yAxisGroup = graph.append("g")



        var circles = graph.selectAll("rect").data(data1);
        const min = d3.min(data1,d=>d)
        const max = d3.max(data1,d=>d)
        // this for lenear height
        const y = d3.scaleLinear().domain([0,max]).range([graphHeight,0])
        // this for band width for x axis
        const x = d3.scaleBand().domain(data1.map(d=>d)).range([0,graphWidth]).paddingInner(.2).paddingOuter(.2)
                                  
    const t = d3.transition().duration(500)

        circles.attr("width",x.bandwidth)
        .attr("height",0)
        .attr("fill", "#ff5722")
        .attr("x",d=>x(d))
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
        .attr("fill", "#ff5722")
        .attr("x",d=>x(d))
        .attr("y",graphHeight)
        .merge(circles)
        .transition(t)
        // .attrTween('width',widthTween)
        .attr("y",d=>y(d))
        .attr("height",d=>graphHeight-y(d))
        
        const xAxis = d3.axisBottom(x)
        const yAxis = d3.axisLeft(y).ticks(4)
        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)



        



        
    
    },[])

    return (
        <div style={{marginLeft:"50%",transform:"translateX(-50%)"}}>
      <svg
        ref={svgRef}
        width="250"
        height="250"
        viewBox="0 0 250 250"
        preserveAspectRatio="xMidYMid meet"
      >
        
      </svg>
    </div>
    )
}
 


