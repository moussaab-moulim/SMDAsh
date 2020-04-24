import React, {useState,useEffect, useRef} from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../actions/rpaAnoActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 300,
      width: 270,
    }
  }));

export default function RpaAno() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.rpaAno)
  const classes = useStyles();
 
  useEffect(() => dispatch(getData()), []);

  return (
    <div className="chart">


<Grid container className={classes.root} >
      <Grid item xs={5} >
            <h2>Tableau Répartition Par Application</h2>
            
            <TableContainer className="" >
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Lignes</TableCell>
                                <TableCell align="center">Count</TableCell>
                               
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {state.dataTable.map((data,i) => (
                                <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                {data.project}
                                </TableCell>
                                <TableCell align="center"> {data.count}</TableCell>
                                
                                </TableRow>
                            ))}
                            <TableRow >
                                <TableCell component="th" scope="row" backgroundColor="red">
                                    <b>Total</b>
                                    </TableCell>
                                    <TableCell align="center"> <b>{state.total}</b></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
      </Grid>
      <Grid item xs={7}>
      <div style={{padding:"5px"}} >
      <h2>Pie Répartition Par Application</h2>
        <Pie data={state.data} options={{
            plugins: {
                labels: {
                   
                    render: 'value',
                    fontSize: 12,
                    
                    fontColor: '#000',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                  },
            },
                responsive: true,
        }} /> 
      </div>
     
       </Grid>
</Grid> 




        

    </div>
   
  );
}





/*
import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../actions/chartAnoActions";


class ChartAno extends Component{
    dispatch = useDispatch();
    state = useSelector(state => state.ChartAno)
/*
    fetchData = (time) => {
        //Fetch data from redux 
        dispatch(getData())
      }
/*
    constructor(props){
        super(props);
        this.state = {
            chartData: {
                datasets: [{
                label: 'In',
                data: [90, 20, 30, 40],
               
                backgroundColor: "#0066cc", 
                },
                {
                    label: 'Out',
                    data: [20, 30, 10, 60],
                   
                    backgroundColor: "#ff4500",
                    
                }, 
                {
                label: 'line Backlog',
                data: [90, 50, 60, 70],
                order: 1,
                type: 'line',
                fill: false,
                backgroundColor: "#0066cc",
                borderColor: "#0066cc",
                }, 
                {
                label: 'Line Teal Backlog',
                data: [91, 50, 40, 40],
                order: 1,
                type: 'line',
                fill: false,
                backgroundColor: "#ffbf00",
                borderColor: "#ffbf00",
                }, 
                {
                label: 'Line OCP Backlog',
                data: [80, 30, 40, 50],
                order: 1,
                type: 'line',
                fill: false,
                backgroundColor: "#cc0000",
                borderColor: "#cc0000"
                }],

                labels: ['4', '5', '6', '7']  
        }
    }
    }
   

    render(){
        return (
            
            <div className="chart">
              
                
            </div>
        )
    }
}
export default ChartAno;
 */
/**
 *  return (
            
            <div className="chart">
                
                <Bar
                    data={this.state.data}
                    height="300vh" width="600vw"
                    options={{
                        responsive: false,
                        animation: {
                            duration: 1,
                            onComplete: function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                ctx.textAlign = 'center';
                                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                                ctx.textBaseline = 'bottom';
        
                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
        
                                    });
                                });
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                gridLines: {
                                display: false
                                },
                                ticks: {
                                    beginAtZero: true,
                                    
                                }
                            }]
                        }
                        
                    }}
                />
                
            </div>
        )
 */