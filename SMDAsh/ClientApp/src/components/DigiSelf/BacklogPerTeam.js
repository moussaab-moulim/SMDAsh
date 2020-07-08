import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    getBacklogDigiSelfOneWeek,
    getBacklogDigiSelfOneMonth,
    getBacklogDigiSelfThreeMonth,
    getBacklogDigiSelfOneYear,
    getBacklogDigiSelfAll
} from '../../redux/actions/DigiSelf/backlogInOutDaysDSAction';


import { COLOR_TEAL, COLOR_ORANGE, COLOR_BLUE } from '../../redux/constants';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';

import CardBody from 'components/Card/CardBody.js';
import { Button } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

import SpinnerChart from './../spinner/SpinnerChart/spinnerChart.component';
import { formatDiagnostic } from 'typescript';

const useStyles = makeStyles((theme) => ({
    paddingTable: {
        padding: '5 1 5 1 !important',
    },
    buttonicon: {
        marginRight: theme.spacing(1),
    },
    card: {
        marginTop: '0px',
    },
    btn: {
        marginBottom: '10px',
    },
    togglbtn: {
        color: 'black !important',
    },
    buttonTealColor: {
        backgroundColor: '#008080',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#008055',
            color: '#FFF',
        },
    },
    buttonRedColor: {
        backgroundColor: '#d44320',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#e6765b ',
            color: '#FFF',
        },
    },
    cardCategoryWhite: {
        '&,& a,& a:hover,& a:focus': {
            color: 'rgba(255,255,255,.62)',
            margin: '0',
            fontSize: '14px',
            marginTop: '0',
            marginBottom: '0',
        },
        '& a,& a:hover,& a:focus': {
            color: '#FFFFFF',
        },
    },

    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
        '& small': {
            color: '#777',
            fontSize: '65%',
            fontWeight: '400',
            lineHeight: '1',
        },
    },
    root: {
        flexGrow: 1,

    },
    paper: {
        height: 300,
        width: 270,
    },
}));


const initialChartState = {
    datasets: [],
    labels: [],
};
export default function BacklogPerTeamDigiSelf() {
    const [statecolumns, setStatecolumns] = useState({
        columns: [
            { title: 'Days', field: 'day' },
            { title: 'Incoming', field: 'in', type: 'numeric' },
            { title: 'Resolved', field: 'out', type: 'numeric' },
            { title: 'Backlog', field: 'backlog', type: 'numeric' },
        ],
    });

    const [chartData, setChartData] = useState(initialChartState);
    const dispatch = useDispatch();
    const chartState = useSelector((state) => state.backlogInOutDaysDS, []) || [];
    const [chartTable, setChartTable] = useState(chartState.dataTable);
   
    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);
/*
    useEffect(() => {
        if (chartState.loading || reloardData) {

           
            setReloadData(false);
        }

        if (!chartState.loading && chartState.dataTable.length > 0) {
            orginizeData()
        }

    }, [chartState.loading]);



    const orginizeData = () => {

        let datatable = chartState.dataTable;
        const arbitraryStackKey = "stack1";
        const newChartArrays = {
            team: [],
            in: [],
            out: [],
            totalIn: 0,
            totalOut: 0,
        };

        for (let i = 0; i < datatable.length; i++) {
            newChartArrays.day.push(datatable[i].team);
            newChartArrays.in.push(datatable[i].in);
            newChartArrays.out.push(datatable[i].out);
            newChartArrays.totalIn += datatable[i].in; 
            newChartArrays.totalIn += datatable[i].out; 
        }
        const newChartData = {
            datasets: [
                {
                    stack: arbitraryStackKey,
                    label: 'Pending',
                    data: [1, 2, 3, 4, 10],
                    backgroundColor: COLOR_ORANGE,
                },
                {
                    stack: arbitraryStackKey,
                    label: 'In Progress',
                    data: [5, 4, 3, 2, 1],
                    backgroundColor: COLOR_TEAL,
                }
               
            ],
            labels: newChartArrays.day,
        };

        setChartData(newChartData);
        setChartTable(datatable);
    };
*/
    const options = {
        title: {
            display: true,
            text: 'Backlog Per Team',
            fontSize: 20,
        },
        plugins: {
            labels: {
                render: 'value',
                fontSize: 12,
                fontColor: '#000',
                fontFamily: '"Lucida Console", Monaco, monospace',
            },
        },
        responsive: true,
        scales: {
            datalabels: {
                color: 'blue',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    },
                    value: {
                        color: 'green'
                    }
                }
            },
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    const arbitraryStackKey = "stack1";
    let data = {
        labels: [
            ['TEAL_Run_L2', ' CustomBuild', ' Apps'],
            ['TEAL_Run_L2','Data'],
            ['TEAL_Run_L2','Industrial Apps'],
            ['TEAL_Run_L2', 'Middelware'],
            ['TEAL_Run_L2','Oracle EBS'],
        ],
        datasets: [
            // These two will be in the same stack.
            {
                stack: arbitraryStackKey,
                label: 'In Progress',
                data: [5, 4, 3, 2, 1],
                backgroundColor: COLOR_TEAL,
            },
            {
                stack: arbitraryStackKey,
                label: 'Pending',
                data: [1, 2, 3, 4, 10],
                backgroundColor:  COLOR_ORANGE,
            }
            
        ]
    }



    return (
        <div id="tablecsspaddingtd">

            <GridContainer>
                <Grid item xs={12} sm={12} md={4} >
                    <Card className={classes.card}>
                        
                        <CardBody>
                            <Grid item
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction='row'
                                justify='space-between'
                                alignItems='center'
                            >

                                <Button
                                    variant='contained'
                                    className={classes.buttonTealColor + ' ' + classes.btn}
                                >
                                    <TableChartIcon className={classes.buttonicon} />
                                 Table PNG
                                </Button>



                            </Grid>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Teams</TableCell>
                                            <TableCell >In Progress</TableCell>
                                            <TableCell >Pending</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">TEAL_Run_L2 CustomBuild Apps</TableCell>
                                            <TableCell align="left">5</TableCell>
                                            <TableCell align="left">1</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">TEAL_Run_L2 Data</TableCell>
                                            <TableCell align="left">4</TableCell>
                                            <TableCell align="left">2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">TEAL_Run_L2 Industrial Apps</TableCell>
                                            <TableCell align="left">3</TableCell>
                                            <TableCell align="left">3</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">TEAL_Run_L2 Middelware</TableCell>
                                            <TableCell align="left">2</TableCell>
                                            <TableCell align="left">4</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">TEAL_Run_L2 Oracle EBS</TableCell>
                                            <TableCell align="left">1</TableCell>
                                            <TableCell align="left">10</TableCell>
                                        </TableRow>



                                        <TableRow >
                                            <TableCell align="left"><b>Total :</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>15</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>20</b></TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </CardBody>


                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8} >
                    <Card className={classes.card}>
                       
                        <CardBody>
                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction='row'
                                justify='flex-end'
                                alignItems='center'
                            >
                                <Button
                                    variant='contained'
                                    className={classes.buttonTealColor + ' ' + classes.btn}
                                >
                                    <GetAppIcon className={classes.buttonicon} />
                                     Chart PNG
                                     </Button>
                            </Grid>
                            <Bar data={data} options={options} />
                        </CardBody>

                    </Card>

                </Grid>
            </GridContainer>

        </div>
    );
}

