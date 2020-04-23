import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Grid, Container }  from '@material-ui/core/';

class Chart extends Component{
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
            <div className="chart"  >
               
                <Bar 
                    data={this.state.chartData}
                    
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
    }
}
export default Chart;