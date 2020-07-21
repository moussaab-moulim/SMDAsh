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

import {
    getBacklogPerTeamDigiSelf
} from '../../redux/actions/DigiSelf/backlogPerteamAction'


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
    const chartState = useSelector((state) => state.backlogPerTeamDS, []) || [];
    const [chartTable, setChartTable] = useState(chartState.dataTable);

    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);
    const [totalPending, setTotalPending] = useState([]);
    const [totalInProgress, setTotalInProgress] = useState([]);

    useEffect(() => {
        if (chartState.loading || reloardData) {

            dispatch(getBacklogPerTeamDigiSelf());
            setReloadData(false);
        }

        if (!chartState.loading && chartState.dataTable.length > 0) {
            orginizeData()
        }

    }, [chartState.loading]);



    const orginizeData = () => {

        let datatable = chartState.dataTable;
        
        const arbitraryStackKey = "stack1";
        let totalPending = 0;
        let totalInProgress = 0;

        const newChartArrays = {
            team: [],
            pending: [],
            inprogress: [],
        };

        for (let i = 0; i < datatable.length; i++) {
            newChartArrays.team.push(datatable[i].status.split(" "));
            let sortBacklog = datatable[i].backlog.sort(function(a, b) {
                if (a.key < b.key) {
                  return -1;
                }
                if (a.key> b.key) {
                  return 1;
                }
                return 0;
              });
              console.log(sortBacklog);
            newChartArrays.inprogress.push(sortBacklog[0].count);
            newChartArrays.pending.push(sortBacklog[1].count);
        }

        totalPending = newChartArrays.pending.reduce((a, b) => a + b, 0);
        totalInProgress = newChartArrays.inprogress.reduce((a, b) => a + b, 0);

        const newChartData = {
            datasets: [
                {
                    stack: arbitraryStackKey,
                    label: 'In Progress',
                    data: newChartArrays.inprogress,
                    backgroundColor: COLOR_TEAL,
                },
                {
                    stack: arbitraryStackKey,
                    label: 'Pending',
                    data: newChartArrays.pending,
                    backgroundColor: COLOR_ORANGE,
                }

            ],
            labels: newChartArrays.team,
        };

        setChartData(newChartData);
        setChartTable(datatable);
        setTotalPending(totalPending);
        setTotalInProgress(totalInProgress);
    };

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
    /*
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
    */


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
                                            <TableCell >Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {chartTable.map((row) => (
                                                <TableRow>
                                                   
                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">{row.backlog[0].count}</TableCell>
                                                    <TableCell align="left">{row.backlog[1].count}</TableCell>
                                                    <TableCell align="left" style={{color: '#008080'}}>
                                                        <b>{row.backlog[0].count + row.backlog[1].count}</b>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }


                                        <TableRow >
                                            <TableCell align="left"><b>Total :</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{totalInProgress}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{totalPending}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{totalInProgress + totalPending}</b></TableCell>
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
                            <Bar data={chartData} options={options} />
                        </CardBody>

                    </Card>

                </Grid>
            </GridContainer>

        </div>
    );
}

