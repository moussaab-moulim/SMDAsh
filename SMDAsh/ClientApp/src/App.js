import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from '../src/components/Chart';

import SpacingGrid from '../src/components/test';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../src/actions/chartAnoActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ChartAno from '../src/components/ChartAno';

function App() {
  return (
    <div className='App'>
      <ChartAno />
    </div>
  );
}

/*
  const dispatch = useDispatch();
  const state = useSelector(state => state.chartAno)

 
  useEffect(() => dispatch(getData()), []);

  return (
    <div className="chart">
                 <Bar
                    data={state.data}
                    
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

            

                <TableContainer className="tableWidth" >
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Year / Week</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Week</TableCell>
                            <TableCell align="right">In</TableCell>
                            <TableCell align="right">Out</TableCell>
                            <TableCell align="right">Backlog</TableCell>
                            <TableCell align="right">TealBacklog</TableCell>
                            <TableCell align="right">OCPBacklog</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.dataTable.map((data,i) => (
                            <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {data.YearWeek}
                            </TableCell>
                            <TableCell align="right"> {data.Year}</TableCell>
                            <TableCell align="right"> {data.Week}</TableCell>
                            <TableCell align="right"> {data.In}</TableCell>
                            <TableCell align="right"> {data.Out}</TableCell>
                            <TableCell align="right"> {data.Backlog}</TableCell>
                            <TableCell align="right"> {data.TealBacklog}</TableCell>
                            <TableCell align="right"> {data.OCPBacklog}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

    </div>
   
  );
*/

export default App;
