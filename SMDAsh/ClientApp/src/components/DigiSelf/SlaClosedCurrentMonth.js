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
import { IconButton, Button } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

import SpinnerChart from './../spinner/SpinnerChart/spinnerChart.component';
import { formatDiagnostic } from 'typescript';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
export default function SlaClosedCurrentMonth() {
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

    const [TRSI, setTRSI] = useState(true);
    const [TRSR, setTRSR] = useState(true);
    const [TableDetails, setTableDetails] = useState(true);

    const [incidentToggle, setIncidentToggle] = useState(false);
    const [requestToggle, setRequestToggle] = useState(false);

    const toggleIncident = () => {
        setIncidentToggle(!incidentToggle);
    }
    const toggleRequest = () => {
        setRequestToggle(!requestToggle);
    }
    const toggleTableDetails = () => {
        setTableDetails(!TableDetails);
    }

    useEffect(() => {


    }, [chartState.loading]);

    /*
        useEffect(() => {
            if (chartState.loading || reloardData) {
    
                dispatch(getBacklogPerTeamDigiSelf());
                setReloadData(false);
            }
    
            if (!chartState.loading && chartState.dataTable.length > 0) {
                orginizeData()
            }
    
        }, [chartState.loading]);
    */
    /*
    
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
    */
    const options = {
        title: {
            display: true,
            text: 'SLA Inc. Closed Current Month / TEAL RUN SERVICES Incident',
            fontSize: 15,
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
    const options2 = {
        title: {
            display: true,
            text: 'SLA Inc. Closed Current Month / TEAL RUN Service Request',
            fontSize: 15,
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
            ['InitialReview'],
            ['Resolution'],
        ],
        datasets: [
            // These two will be in the same stack.
            {
                stack: arbitraryStackKey,
                label: 'Achived',
                data: [103, 103],
                backgroundColor: COLOR_TEAL,
            },
            {
                stack: arbitraryStackKey,
                label: 'Failed',
                data: [9, 9],
                backgroundColor: COLOR_ORANGE,
            }

        ]
    }
    let data2 = {
        labels: [
            ['Fulfillment'],
            ['Approval'],
        ],
        datasets: [
            // These two will be in the same stack.
            {
                stack: arbitraryStackKey,
                label: 'Achived',
                data: [205, 180],
                backgroundColor: COLOR_TEAL,
            },
            {
                stack: arbitraryStackKey,
                label: 'Failed',
                data: [4, 0],
                backgroundColor: COLOR_ORANGE,
            }

        ]
    }




    return (
        <div id="tablecsspaddingtd">

            <GridContainer>
                <Grid item xs={12} sm={12} md={5} >
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
                                            <TableCell>Lines Tickets</TableCell>
                                            <TableCell >Achieved</TableCell>
                                            <TableCell >Failed</TableCell>
                                            <TableCell >Total général</TableCell>
                                            <TableCell >%</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {/*
                                         <TableCell align="left" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                0%
                                            </TableCell>
                                            
                                                <TableCell align="left" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                            90%
                                            </TableCell>
                                           
                                           <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                100%
                                            </TableCell>
                                        */}
                                        <TableRow style={{
                                            backgroundColor: '#cecece',
                                        }}
                                        >
                                            <TableCell align="left" ><b>TEAL RUN SERVICES Incident</b></TableCell>
                                            <TableCell align="left"><b>206</b></TableCell>
                                            <TableCell align="left"><b>18</b></TableCell>
                                            <TableCell align="left"><b>224</b></TableCell>
                                            <TableCell align="right">

                                                {incidentToggle ? (
                                                    <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                ) : (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                        {incidentToggle ? (
                                            <TableRow>
                                                <TableCell align="left">InitialReview</TableCell>
                                                <TableCell align="left">103</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    112
                                                   </TableCell>

                                                <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    92%
                                            </TableCell>
                                            </TableRow>
                                        ) : null}
                                        {incidentToggle ? (
                                            <TableRow>
                                                <TableCell align="left">Resolution</TableCell>
                                                <TableCell align="left">103</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    112
                                            </TableCell>

                                                <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    92%
                                            </TableCell>
                                            </TableRow>
                                        ) : null}

                                        <TableRow style={{
                                            backgroundColor: '#cecece',
                                        }}
                                        >
                                            <TableCell align="left"><b>TEAL RUN Service Request</b></TableCell>
                                            <TableCell align="left"><b>385</b></TableCell>
                                            <TableCell align="left"><b>4</b></TableCell>
                                            <TableCell align="left"><b>389</b></TableCell>
                                            <TableCell align="right">

                                                {requestToggle ? (
                                                    <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequest() }} color="primary" aria-label="add to shopping cart">
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                ) : (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequest() }} color="primary" aria-label="add to shopping cart">
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                        {requestToggle ? (
                                            <TableRow>
                                                <TableCell align="left">Fulfillment</TableCell>
                                                <TableCell align="left">205</TableCell>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    209
                                            </TableCell>

                                                <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    98.1%
                                            </TableCell>
                                            </TableRow>
                                        ) : null}
                                        {requestToggle ? (
                                            <TableRow>
                                                <TableCell align="left">Approval</TableCell>
                                                <TableCell align="left">180</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    180
                                            </TableCell>

                                                <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>
                                            </TableRow>
                                        ) : null}

                                        <TableRow >
                                            <TableCell align="left"><b>Total :</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{591}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{22}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{613}</b></TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid item style={{ marginTop: "10px" }}
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction='row'
                                justify='center'
                                alignItems='center'
                            >

                                <Button
                                    variant='contained' style={{ fontSize: "13px" }}
                                    className={classes.buttonTealColor + ' ' + classes.btn}
                                    onClick={() => { toggleTableDetails() }}
                                >

                                    {TableDetails ? "Hide" : "Show"} Detailed Table SLA Inc Closed Current Month
                                </Button>

                            </Grid>

                            {TableDetails ?<div>
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
                                                <TableCell>Lines Tickets</TableCell>
                                                <TableCell >Achieved</TableCell>
                                                <TableCell >Failed</TableCell>
                                                <TableCell >Total général</TableCell>
                                                <TableCell align="center">%</TableCell>
                                                <TableCell ></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {/*
                                         <TableCell align="left" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                0%
                                            </TableCell>
                                            
                                                <TableCell align="left" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                            90%
                                            </TableCell>
                                           
                                           <TableCell align="left" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                100%
                                            </TableCell>
                                        */}
                                            <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >

                                                <TableCell align="left"><b>TEAL RUN SERVICES Incident</b></TableCell>
                                                <TableCell align="left"><b>206</b></TableCell>
                                                <TableCell align="left"><b>18</b></TableCell>
                                                <TableCell align="left"><b>224</b></TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}><b>92%</b></TableCell>
                                                <TableCell align="right">

                                                    {incidentToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                            {incidentToggle ?
                                                <TableRow style={{
                                                    backgroundColor: '#cecece',
                                                }}
                                                >
                                                    <TableCell align="left">InitialReview</TableCell>
                                                    <TableCell align="left">103</TableCell>
                                                    <TableCell align="left">9</TableCell>
                                                    <TableCell align="left" style={{ color: '#008080' }}>
                                                        112
                                                   </TableCell>

                                                    <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                        92%
                                            </TableCell>
                                                    <TableCell align="right">

                                                        {incidentToggle ? (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                                <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            )
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                                : null}

                                            {incidentToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 CustomBuild Apps</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    9
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {incidentToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Industrial Apps</TableCell>
                                                <TableCell align="left">16</TableCell>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    20
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                    80%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {incidentToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Middelware</TableCell>
                                                <TableCell align="left">78</TableCell>
                                                <TableCell align="left">6</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    84
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                    93%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {incidentToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Oracle EBS</TableCell>
                                                <TableCell align="left">1</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    1
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}


                                            {incidentToggle ? <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >
                                                <TableCell align="left">Resolution</TableCell>
                                                <TableCell align="left">103</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    112
                                            </TableCell>

                                                <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                    92%
                                            </TableCell>
                                                <TableCell align="right">

                                                    {incidentToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                                : null}

                                            {incidentToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 CustomBuild Apps</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    9
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}{incidentToggle ? <TableRow>
                                                    <TableCell align="left">TEAL_Run_L2 Industrial Apps</TableCell>
                                                    <TableCell align="left">16</TableCell>
                                                    <TableCell align="left">4</TableCell>
                                                    <TableCell align="left" style={{ color: '#008080' }}>
                                                        20
                                            </TableCell>
                                                    <TableCell align="center" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                        80%
                                            </TableCell>

                                                </TableRow>
                                                    : null}{incidentToggle ? <TableRow>
                                                        <TableCell align="left">TEAL_Run_L2 Middelware</TableCell>
                                                        <TableCell align="left">78</TableCell>
                                                        <TableCell align="left">6</TableCell>
                                                        <TableCell align="left" style={{ color: '#008080' }}>
                                                            84
                                            </TableCell>
                                                        <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                            93%
                                            </TableCell>

                                                    </TableRow>
                                                        : null}{incidentToggle ? <TableRow>
                                                            <TableCell align="left">TEAL_Run_L2 Oracle EBS</TableCell>
                                                            <TableCell align="left">1</TableCell>
                                                            <TableCell align="left">0</TableCell>
                                                            <TableCell align="left" style={{ color: '#008080' }}>
                                                                1
                                            </TableCell>
                                                            <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                                100%
                                            </TableCell>

                                                        </TableRow>
                                                            : null}



                                            <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >
                                                <TableCell align="left"><b>TEAL RUN Service Request</b></TableCell>
                                                <TableCell align="left"><b>385</b></TableCell>
                                                <TableCell align="left"><b>4</b></TableCell>
                                                <TableCell align="left"><b>389</b></TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    99%
                                            </TableCell>
                                                <TableCell align="right">

                                                    {requestToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequest() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequest() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                            {requestToggle ?
                                                <TableRow style={{
                                                    backgroundColor: '#cecece',
                                                }}>
                                                    <TableCell align="left">Fulfillment</TableCell>
                                                    <TableCell align="left">205</TableCell>
                                                    <TableCell align="left">4</TableCell>
                                                    <TableCell align="left" style={{ color: '#008080' }}>
                                                        209
                                            </TableCell>

                                                    <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                        98.1%
                                            </TableCell>
                                                    <TableCell align="right">

                                                        {incidentToggle ? (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                                <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            )
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                                : null}
                                            {/* Start Teams */}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 CustomBuild Apps</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    9
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Industrial Apps</TableCell>
                                                <TableCell align="left">16</TableCell>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    20
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                    80%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Middelware</TableCell>
                                                <TableCell align="left">78</TableCell>
                                                <TableCell align="left">6</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    84
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                    93%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Oracle EBS</TableCell>
                                                <TableCell align="left">1</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    1
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {/* End Teams */}
                                            {requestToggle ? <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}>
                                                <TableCell align="left">Approval</TableCell>
                                                <TableCell align="left">180</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    180
                                            </TableCell>

                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>
                                                <TableCell align="right">

                                                    {incidentToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncident() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                                : null}

                                            {/* Start Teams */}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 CustomBuild Apps</TableCell>
                                                <TableCell align="left">9</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    9
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Industrial Apps</TableCell>
                                                <TableCell align="left">16</TableCell>
                                                <TableCell align="left">4</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    20
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}>
                                                    80%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Middelware</TableCell>
                                                <TableCell align="left">78</TableCell>
                                                <TableCell align="left">6</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    84
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>
                                                    93%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {requestToggle ? <TableRow>
                                                <TableCell align="left">TEAL_Run_L2 Oracle EBS</TableCell>
                                                <TableCell align="left">1</TableCell>
                                                <TableCell align="left">0</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    1
                                            </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>
                                                    100%
                                            </TableCell>

                                            </TableRow>
                                                : null}
                                            {/* End Teams */}

                                            <TableRow >
                                                <TableCell align="left"><b>Total :</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{591}</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{22}</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{613}</b></TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#ffe29d', color: '#896305' }}>
                                                    96%
                                            </TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                               
                            </div> : null
                        }
                            

                        </CardBody>

                    </Card>

                </Grid>
                <Grid item xs={12} sm={12} md={7} >
                    <Card className={classes.card} style={{ marginBottom: "2px" }}>

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
                            <Bar data={data2} options={options2} />
                        </CardBody>

                    </Card>

                </Grid>
            </GridContainer>

        </div>
    );
}

