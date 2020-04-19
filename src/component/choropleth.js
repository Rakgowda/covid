import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { Tween, Timeline } from 'react-gsap';
import {useSelector,useDispatch} from "react-redux"




// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];




const   geographyStyle = {
  default: {
    outline: 'none',
    color:"#000"
  },
  hover: {
    fill: '#000',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

const Statecenter = {
  karnataka:{
    lat:75.713890,lon:15.317277
  },
  tamilnadu:{
    lat:78.387451,lon:11.059821
  },
  telangana:{
    lat:79.208824,lon:17.123184
  },
  madhyapradesh:{
    lat:77.947998,lon:23.473324
  },
  haryana:{
    lat:76.431885,lon:29.238478
  },
  chhattisgarh:{
    lat:81.828232,lon:21.295132
  },
  maharashtra:{
    lat:75.552979,lon:19.601194
  },
  tripura:{
    lat:91.746826,lon:23.745127
  },
  kerala:{
    lat:76.271080,lon:10.850516
  },
  uttarpradesh:{
    lat:79.826660,lon:28.207609
  },
  assam:{
    lat:92.537842,lon:26.244156
  },
  westbengal:{
    lat:87.747803,lon:22.978624
  },
  gujarat:{
    lat:72.136230,lon:22.309425
  },
  odisha:{
    lat:84.803467,lon:20.940920
  },
  rajasthan:{
    lat:73.432617,lon:27.391277
  },
  himachalpradesh:{
    lat:77.571167,lon:32.084206
  },
  andhrapradesh:{
    lat:79.7400,lon:15.9129
  },
  jammuandkashmir:{
    lat:76.5762,lon:33.7782
  },
  punjab :{
    lat:75.3412,lon:31.1471
  },bihar:{
    lat:85.3131,lon:25.0961
  },uttarakhand :{
    lat:79.0193,lon:30.0668
  },
  chhattisgarh :{
    lat:81.8661,lon:21.2787
  },
  jharkhand  :{
    lat:85.2799,lon:23.6102
  },
  andamanandnicobarislands :{
    lat:92.6586,lon:11.7401
  },
  ladakh  :{
    lat:78.2932,lon:34.2996
  },
  goa :{
    lat:74.1240,lon:15.2993
  },
  pondicherry  :{
    lat:79.8083,lon:11.9416
  },
  manipur :{
    lat:93.9063,lon:24.6637
  },
  delhi  :{
    lat:77.1025,lon:28.7041
  },
  tirupur :{
    lat:77.3411,lon:11.1085
  },
  mizoram  :{
    lat:92.9376,lon:23.1645
  },arunachalpradesh :{
    lat:94.7278,lon:28.2180
  },nagaland :{
    lat:94.5624,lon:26.1584
  },meghalaya :{
    lat:91.3662,lon:25.4670
  },
  sikkim:{
    lat:88.5122,lon:27.5330
  },
  
}

// will generate random heatmap data on every call

function Cholopleth(params) {
  const covidStaTrackingstate = useSelector(state=>state.globalreducer)
  const INDIA_TOPO_JSON = require('../maps/'+params.statename+".json");
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(params.HeathMap);
  let sca = window.innerWidth>700?200:600;
  const [District,setDistrict] = useState([])
  
const PROJECTION_CONFIG = {
  scale: sca,
  center: Statecenter[params.statename]?[Statecenter[params.statename].lat,Statecenter[params.statename].lon]:[] // always in [East Latitude, North Longitude]
};


  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      let IncresedDI = covidStaTrackingstate.data[params.statename]!== undefined?covidStaTrackingstate.data[params.statename].districtData[geo.properties.district].delta.confirmed:0;
      setDistrict([])
      setDistrict([geo.properties.district,current.value!=="NA"?current.value:0,IncresedDI])
      setTooltipContent(`${geo.properties.district}: ${current.value!=="NA"?current.value:0}`);
    };
  };

  const onMouseLeave = () => {
    setDistrict([]);
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(params.HeathMap);
  };

  return (
    <Tween ease="Back.easeIn"  from={{opacity:0,y: '-20px'}} to={{opacity:1,y: '0px'}} duration={1.5}>
   
    <div className="full-width-height container" >
       
    {District.length>0?(
      (<div style={Style.DIstrictInfo}>
        <h3>{District[0]}</h3>
        
      <table className="table table-striped table-borderless table-sm table-responsive" style={{fontSize:window.innerWidth>700?15:10}}>
    <thead>
      <tr>
        <th>Confirmed</th>
        <th>Increased</th>
      
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>{District[1]}</td>
        <td>{District[2]}</td>
      </tr>
      
    </tbody>
  </table>
      </div>
        )
    ):""}
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={window.innerWidth>700?50:100}
          height={window.innerWidth>700?30:80}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                // console.log(geo)
                //console.log(geo.id);
                const current = data.find(s => s.id === geo.properties.district);
                let color = current?current.color:"#50d890"
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo,current )}
                    onMouseLeave={onMouseLeave}
                    
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
       
    
    </div>
    </Tween>
  );
}

const Style = {
  DIstrictInfo:{
color:"red",
position:"absolute",
textAlign:"center"
  },
}


export default Cholopleth;
