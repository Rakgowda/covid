import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Badge from '@material-ui/core/Badge';
import {NumbFormate} from "./Formate"
import CountUp from 'react-countup';
import MiniLIne from "../component/miniline"

const useStyles = makeStyles({
  card: {
    width: 100,
    marginTop:50,
    color:"white",
    margin: 10,
    height:150,
    marginTop:-10,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius:5,
  

  },
  
  title:{
      fontSize:12,
      letterSpacing:"0.1em",
      fontWeight:"bold",
      textAlign:"center",
      color:"black",
      
      
    
  },
  subtitlt:{
      fontSize:15,
      letterSpacing:"0.1em",
      fontWeight:"bold",
      textAlign:"center",
      padding: 10
     

  },
  arrow:{
      color:"white",
      position:"relative",
      display:"flex",
      justifyContent:"flex-end",
     
  }

 
});

function Tracking(params) {
    const classes = useStyles();
    const cardcolor =  {background:params.cardColor,borderColor:params.cardColor};

    return (
      <Card className={classes.card} style={cardcolor} variant="outlined">
        <div className={classes.arrow}>
        <ArrowUpwardIcon style={{ fontSize:15,transform:params.increased>0?"":"rotate(-180deg)"}}></ArrowUpwardIcon>
        <Typography style={{ fontSize:12}}>{params.increased==="..."?"...":<CountUp delay={2} separator="," duration={4} end={params.increased}></CountUp>}</Typography>

        </div>
        
        <CardContent style={{padding:0}}>
    <div>
    <Typography className={classes.subtitlt}>{params.data==="..."?params.data:<CountUp delay={2} separator="," duration={2} end={params.data}></CountUp>}</Typography>
     
      </div>    
    <div style={{background:"white"}}>
    <Typography variant="body2" className={classes.title}>{NumbFormate(params.cardTitle)}</Typography>
    </div>
      {params.linedata?<MiniLIne linedata={params.linedata}></MiniLIne>:""}
        </CardContent>
      </Card>
    );
        
    
}



export default Tracking;
