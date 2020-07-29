import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    getSlaClosed
} from '../../redux/actions/DigiSelf/slaClosedCurrentMonthAction';

import { COLOR_TEAL, COLOR_ORANGE, COLOR_BLUE } from '../../redux/constants';
// core components

import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';

import CardBody from 'components/Card/CardBody.js';
import { IconButton, Button } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';


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

    const dispatch = useDispatch();
    const chartState = useSelector((state) => state.slaClosedCurrentMonth, []) || [];


    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);


    // Start - Data For Table Declaration

    const [dataAnomaly, setDataAnomaly] = useState([]);
    const [dataSr, setDataSr] = useState([]);

    const [dataAnomalyInitialReview, setDataAnomalyInitialReview] = useState([]);
    const [dataAnomalyResolution, setDataAnomalyResolution] = useState([]);
    const [dataSrFulfillment, setDataSrFulfillment] = useState([]);
    const [dataSrApproval, setDataSrApproval] = useState([]);

    const [dataAnomalyInitialReviewTeams, setDataAnomalyInitialReviewTeams] = useState([]);
    const [dataAnomalyResolutionTeams, setDataAnomalyResolutionTeams] = useState([]);
    const [dataSrFulfillmentTeams, setDataSrFulfillmentTeams] = useState([]);
    const [dataSrApprovalTeams, setDataSrApprovalTeams] = useState([]);

    // End - Data For Table Declaration

    // Start - Data Chart Declaration
    const [dataChartAnomaly, setDataChartAnomaly] = useState(initialChartState);
    const [dataChartSr, setDataChartSr] = useState(initialChartState);
    // End - Data Chart Declaration

    const [TRSI, setTRSI] = useState(true);
    const [TRSR, setTRSR] = useState(true);

    // Start Toggle 1
    const [incidentToggleSmall, setIncidentToggleSmall] = useState(true);
    const [requestToggleSmall, setRequestToggleSmall] = useState(true);

    const [incidentToggleBig, setIncidentToggleBig] = useState(false);
    const [requestToggleBig, setRequestToggleBig] = useState(false);

    const toggleIncidentSmall = () => {
        setIncidentToggleSmall(!incidentToggleSmall);
    }
    const toggleRequestSmall = () => {
        setRequestToggleSmall(!requestToggleSmall);
    }
    const toggleIncidentBig = () => {
        setInitialReviewToggle(false);
        setResolutionToggle(false);
        setIncidentToggleBig(!incidentToggleBig);
    }
    const toggleRequestBig = () => {
        setFulfillmentToggle(false);
        setApprovalToggle(false);
        setRequestToggleBig(!requestToggleBig);
    }
    //End Toggle 1

    // Start Toggle 2
    const [initialReviewToggle, setInitialReviewToggle] = useState(false);
    const [resolutionToggle, setResolutionToggle] = useState(false);
    const [fulfillmentToggle, setFulfillmentToggle] = useState(false);
    const [approvalToggle, setApprovalToggle] = useState(false);

    const toggleInitialReview = () => {
        setInitialReviewToggle(!initialReviewToggle);
    }
    const toggleResolution = () => {
        setResolutionToggle(!resolutionToggle);
    }
    const toggleFulfillment = () => {
        setFulfillmentToggle(!fulfillmentToggle);
    }
    const toggleApproval = () => {
        setApprovalToggle(!approvalToggle);
    }
    // End Toggle 2


    const percentageCalc = (achieved, total) => {
        let percentage = 0;
        percentage = ((achieved * 100) / total).toFixed(0);

        if (percentage <= 80) {
            return (<TableCell align="center" style={{ backgroundColor: '#ff9c9c', color: '#df0000' }}> {percentage}% </TableCell>);
        } else if (percentage <= 90) {
            return (<TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}> {percentage}% </TableCell>);
        } else if (percentage <= 95) {
            return (<TableCell align="center" style={{ backgroundColor: '#ffa887', color: '#b53100' }}>{percentage}%</TableCell>)
        } else if (percentage <= 97) {
            return (<TableCell align="center" style={{ backgroundColor: '#ffe29d', color: '#896305' }}>{percentage}%</TableCell>)
        } else if (percentage <= 100) {
            return (<TableCell align="center" style={{ backgroundColor: '#a0ffa0', color: '#006400' }}>{percentage}%</TableCell>)
        }

    }



    useEffect(() => {
        if (chartState.loading || reloardData) {

            dispatch(getSlaClosed());
            setReloadData(false);
        }

        if (!chartState.loading && chartState.dataTable.length > 0) {
            orginizeData()
        }

    }, [chartState.loading]);


    const orginizeData = () => {

        let datatable = chartState.dataTable;

        let dataAnomaly = [];
        let dataSr = [];

        datatable.map((row) => {
            if (row.category === "Anomalie") {
                dataAnomaly = row;
            } else if (row.category === "SR") {
                dataSr = row;
            }
        });


        let dataAnomalyInitialReview = [];
        let dataAnomalyResolution = [];

        dataAnomaly.targetType.map((row) => {
            if (row.type === "InitialReview") {
                dataAnomalyInitialReview = row;
            } else if (row.type === "Resolution") {
                dataAnomalyResolution = row;
            }
        });

        let dataSrFulfillment = [];
        let dataSrApproval = [];

        dataSr.targetType.map((row) => {
            if (row.type === "Fulfillment") {
                dataSrFulfillment = row;
            } else if (row.type === "Approval") {
                dataSrApproval = row;
            }
        });

        // Start get Teams
        let dataAnomalyInitialReviewTeams = dataAnomalyInitialReview.team;
        let dataAnomalyResolutionTeams = dataAnomalyResolution.team;

        let dataSrFulfillmentTeams = dataSrFulfillment.team;
        let dataSrApprovalTeams = dataSrApproval.team;
        // End get Teams


        // Start Chart Data
        const arbitraryStackKey = "stack1";
        const newChartArrays = {
            AnomalyAchieved: [],
            AnomalyFailed: [],
            SrAchieved: [],
            SrFailed: [],
        };

       newChartArrays.AnomalyAchieved.push(dataAnomalyInitialReview.achieved);
       newChartArrays.AnomalyAchieved.push(dataAnomalyResolution.achieved);
       newChartArrays.AnomalyFailed.push(dataAnomalyInitialReview.failed);
       newChartArrays.AnomalyFailed.push(dataAnomalyResolution.failed);

       newChartArrays.SrAchieved.push(dataSrFulfillment.achieved);
       newChartArrays.SrAchieved.push(dataSrApproval.achieved);
       newChartArrays.SrFailed.push(dataSrFulfillment.failed);
       newChartArrays.SrFailed.push(dataSrApproval.failed);
           
   
       const dataAnomalyChart = {
           labels: [
               ['InitialReview'],
               ['Resolution'],
           ],
           datasets: [
               // These two will be in the same stack.
               {
                   stack: arbitraryStackKey,
                   label: 'Achived',
                   data: newChartArrays.AnomalyAchieved,
                   backgroundColor: COLOR_TEAL,
               },
               {
                   stack: arbitraryStackKey,
                   label: 'Failed',
                   data: newChartArrays.AnomalyFailed,
                   backgroundColor: COLOR_ORANGE,
               }
   
           ]
       }
       const dataSrChart = {
           labels: [
               ['Fulfillment'],
               ['Approval'],
           ],
           datasets: [
               // These two will be in the same stack.
               {
                   stack: arbitraryStackKey,
                   label: 'Achived',
                   data: newChartArrays.SrAchieved,
                   backgroundColor: COLOR_TEAL,
               },
               {
                   stack: arbitraryStackKey,
                   label: 'Failed',
                   data: newChartArrays.SrFailed,
                   backgroundColor: COLOR_ORANGE,
               }
   
           ]
       }
       // End Chart Data

        setDataAnomaly(dataAnomaly);
        setDataSr(dataSr);

        setDataAnomalyInitialReview(dataAnomalyInitialReview);
        setDataAnomalyResolution(dataAnomalyResolution);
        setDataSrFulfillment(dataSrFulfillment);
        setDataSrApproval(dataSrApproval);

        setDataAnomalyInitialReviewTeams(dataAnomalyInitialReviewTeams);
        setDataAnomalyResolutionTeams(dataAnomalyResolutionTeams);
        setDataSrFulfillmentTeams(dataSrFulfillmentTeams);
        setDataSrApprovalTeams(dataSrApprovalTeams);

        setDataChartAnomaly(dataAnomalyChart);
        setDataChartSr(dataSrChart);

    };

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







    return (
        <div id="tablecsspaddingtd">

            <GridContainer>
               
                <Grid item xs={12} sm={12} md={5} >
                    <Card className={classes.card}>
                    {chartState.loading ? <SpinnerChart />: null}
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
                                            <TableCell > </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow style={{
                                            backgroundColor: '#cecece',
                                        }}
                                        >
                                            <TableCell align="left" ><b>TEAL RUN SERVICES Incident</b></TableCell>
                                            <TableCell align="left"><b>{dataAnomaly.achieved}</b></TableCell>
                                            <TableCell align="left"><b>{dataAnomaly.failed}</b></TableCell>
                                            <TableCell align="left"><b>{dataAnomaly.total}</b></TableCell>
                                            <TableCell align="right">

                                                {incidentToggleSmall ? (
                                                    <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncidentSmall() }} color="primary" aria-label="add to shopping cart">
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                ) : (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncidentSmall() }} color="primary" aria-label="add to shopping cart">
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                        {incidentToggleSmall ? (
                                            <TableRow>
                                                <TableCell align="left">{dataAnomalyInitialReview.type}</TableCell>
                                                <TableCell align="left">{dataAnomalyInitialReview.achieved}</TableCell>
                                                <TableCell align="left">{dataAnomalyInitialReview.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataAnomalyInitialReview.total}
                                                </TableCell>

                                                {percentageCalc(dataAnomalyInitialReview.achieved, dataAnomalyInitialReview.total)}
                                            </TableRow>
                                        ) : null}
                                        {incidentToggleSmall ? (
                                            <TableRow>
                                                <TableCell align="left">{dataAnomalyResolution.type}</TableCell>
                                                <TableCell align="left">{dataAnomalyResolution.achieved}</TableCell>
                                                <TableCell align="left">{dataAnomalyResolution.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataAnomalyResolution.total}
                                                </TableCell>

                                                {percentageCalc(dataAnomalyResolution.achieved, dataAnomalyResolution.total)}
                                            </TableRow>
                                        ) : null}

                                        <TableRow style={{
                                            backgroundColor: '#cecece',
                                        }}
                                        >
                                            <TableCell align="left"><b>TEAL RUN Service Request</b></TableCell>
                                            <TableCell align="left"><b>{dataSr.achieved}</b></TableCell>
                                            <TableCell align="left"><b>{dataSr.failed}</b></TableCell>
                                            <TableCell align="left"><b>{dataSr.total}</b></TableCell>
                                            <TableCell align="right">

                                                {requestToggleSmall ? (
                                                    <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequestSmall() }} color="primary" aria-label="add to shopping cart">
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                ) : (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequestSmall() }} color="primary" aria-label="add to shopping cart">
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                        {requestToggleSmall ? (
                                            <TableRow>
                                                <TableCell align="left">{dataSrFulfillment.type}</TableCell>
                                                <TableCell align="left">{dataSrFulfillment.achieved}</TableCell>
                                                <TableCell align="left">{dataSrFulfillment.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataSrFulfillment.total}
                                                </TableCell>
                                                {percentageCalc(dataSrFulfillment.achieved, dataSrFulfillment.total)}
                                            </TableRow>
                                        ) : null}
                                       {requestToggleSmall ? (
                                            <TableRow>
                                                <TableCell align="left">{dataSrApproval.type}</TableCell>
                                                <TableCell align="left">{dataSrApproval.achieved}</TableCell>
                                                <TableCell align="left">{dataSrApproval.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataSrApproval.total}
                                                </TableCell>
                                                {percentageCalc(dataSrApproval.achieved, dataSrApproval.total)}
                                            </TableRow>
                                        ) : null}

                                        <TableRow >
                                            <TableCell align="left"><b>Total :</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{dataAnomaly.achieved + dataSr.achieved}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{dataAnomaly.failed + dataSr.failed}</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'
                                            }} align="left"><b>{dataAnomaly.total + dataSr.total}</b></TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>



                            <div>
                                <Grid item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                    style={{ marginTop: 10 }}
                                >
                                    <Button
                                        variant='contained'
                                        className={classes.buttonTealColor + ' ' + classes.btn}
                                    >
                                        <TableChartIcon className={classes.buttonicon} />
                                 Table PNG
                                </Button>
                                
                                <h5><i>Detailed Table</i></h5>

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
                                            <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >
                                                <TableCell align="left"><b>TEAL RUN SERVICES Incident</b></TableCell>
                                                <TableCell align="left"><b>{dataAnomaly.achieved}</b></TableCell>
                                                <TableCell align="left"><b>{dataAnomaly.failed}</b></TableCell>
                                                <TableCell align="left"><b>{dataAnomaly.total}</b></TableCell>
                                                {percentageCalc(dataAnomaly.achieved, dataAnomaly.total)}

                                                <TableCell align="right">
                                                    {incidentToggleBig ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncidentBig() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleIncidentBig() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }
                                                </TableCell>
                                            </TableRow>

                                            {incidentToggleBig ?
                                                <TableRow style={{
                                                    backgroundColor: '#cecece',
                                                }}
                                                >
                                                    <TableCell align="left">{dataAnomalyInitialReview.type}</TableCell>
                                                    <TableCell align="left">{dataAnomalyInitialReview.achieved}</TableCell>
                                                    <TableCell align="left">{dataAnomalyInitialReview.failed}</TableCell>
                                                    <TableCell align="left" style={{ color: '#008080' }}>
                                                        {dataAnomalyInitialReview.total}
                                                    </TableCell>

                                                    {percentageCalc(dataAnomalyInitialReview.achieved, dataAnomalyInitialReview.total)}

                                                    <TableCell align="right">

                                                        {initialReviewToggle ? (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleInitialReview() }} color="primary" >
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                                <IconButton style={{ padding: '0px' }} onClick={() => { toggleInitialReview() }} color="primary">
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            )
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                                : null}


                                            {initialReviewToggle ?
                                                dataAnomalyInitialReviewTeams.map((row) => (
                                                    <TableRow>
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="left">{row.achieved}</TableCell>
                                                        <TableCell align="left">{row.failed}</TableCell>
                                                        <TableCell align="left" style={{ color: '#008080' }}>
                                                            {row.total}
                                                        </TableCell>
                                                        {percentageCalc(row.achieved, row.total)}
                                                    </TableRow>
                                                ))
                                                : null
                                            }


                                            {incidentToggleBig ? <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >
                                                <TableCell align="left">{dataAnomalyResolution.type}</TableCell>
                                                <TableCell align="left">{dataAnomalyResolution.achieved}</TableCell>
                                                <TableCell align="left">{dataAnomalyResolution.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataAnomalyResolution.total}
                                                </TableCell>

                                                {percentageCalc(dataAnomalyResolution.achieved, dataAnomalyResolution.total)}

                                                <TableCell align="right">

                                                    {resolutionToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleResolution() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleResolution() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                                : null}

                                            {resolutionToggle ?
                                                dataAnomalyResolutionTeams.map((row) => (
                                                    <TableRow>
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="left">{row.achieved}</TableCell>
                                                        <TableCell align="left">{row.failed}</TableCell>
                                                        <TableCell align="left" style={{ color: '#008080' }}>
                                                            {row.total}
                                                        </TableCell>
                                                        {percentageCalc(row.achieved, row.total)}
                                                    </TableRow>
                                                ))
                                                : null
                                            }



                                            <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}
                                            >
                                                <TableCell align="left"><b>TEAL RUN Service Request</b></TableCell>
                                                <TableCell align="left"><b>{dataSr.achieved}</b></TableCell>
                                                <TableCell align="left"><b>{dataSr.failed}</b></TableCell>
                                                <TableCell align="left"><b>{dataSr.total}</b></TableCell>

                                                {percentageCalc(dataSr.achieved, dataSr.total)}

                                                <TableCell align="right">

                                                    {requestToggleBig ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequestBig() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleRequestBig() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </TableCell>
                                            </TableRow>
                                            {requestToggleBig ?
                                                <TableRow style={{
                                                    backgroundColor: '#cecece',
                                                }}>
                                                    <TableCell align="left">{dataSrFulfillment.type}</TableCell>
                                                    <TableCell align="left">{dataSrFulfillment.achieved}</TableCell>
                                                    <TableCell align="left">{dataSrFulfillment.failed}</TableCell>
                                                    <TableCell align="left" style={{ color: '#008080' }}>
                                                        {dataSrFulfillment.total}
                                                    </TableCell>
                                                    {percentageCalc(dataSrFulfillment.achieved, dataSrFulfillment.total)}

                                                    <TableCell align="right">

                                                        {fulfillmentToggle ? (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleFulfillment() }} color="primary" aria-label="add to shopping cart">
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                                <IconButton style={{ padding: '0px' }} onClick={() => { toggleFulfillment() }} color="primary" aria-label="add to shopping cart">
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            )
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                                : null}
                                            {/* Start Teams */}
                                            {fulfillmentToggle ?
                                                dataSrFulfillmentTeams.map((row) => (
                                                    <TableRow>
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="left">{row.achieved}</TableCell>
                                                        <TableCell align="left">{row.failed}</TableCell>
                                                        <TableCell align="left" style={{ color: '#008080' }}>
                                                            {row.total}
                                                        </TableCell>
                                                        {percentageCalc(row.achieved, row.total)}
                                                    </TableRow>
                                                ))
                                                : null
                                            }
                                            {/* End Teams */}
                                            {requestToggleBig ? <TableRow style={{
                                                backgroundColor: '#cecece',
                                            }}>
                                                <TableCell align="left">{dataSrApproval.type}</TableCell>
                                                <TableCell align="left">{dataSrApproval.achieved}</TableCell>
                                                <TableCell align="left">{dataSrApproval.failed}</TableCell>
                                                <TableCell align="left" style={{ color: '#008080' }}>
                                                    {dataSrApproval.total}
                                                </TableCell>
                                                {percentageCalc(dataSrApproval.achieved, dataSrApproval.total)}

                                                <TableCell align="right">

                                                    {approvalToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleApproval() }} color="primary">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleApproval() }} color="primary">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }
                                                </TableCell>
                                            </TableRow>
                                                : null}

                                            {/* Start Teams */}
                                            {approvalToggle ?
                                                dataSrApprovalTeams.map((row) => (
                                                    <TableRow>
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="left">{row.achieved}</TableCell>
                                                        <TableCell align="left">{row.failed}</TableCell>
                                                        <TableCell align="left" style={{ color: '#008080' }}>
                                                            {row.total}
                                                        </TableCell>
                                                        {percentageCalc(row.achieved, row.total)}
                                                    </TableRow>
                                                ))
                                                : null
                                            }
                                            {/* End Teams */}

                                            <TableRow >
                                                <TableCell align="left"><b>Total :</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{dataAnomaly.achieved + dataSr.achieved}</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{dataAnomaly.failed + dataSr.failed}</b></TableCell>
                                                <TableCell style={{
                                                    color: '#008080'
                                                }} align="left"><b>{dataAnomaly.total + dataSr.total}</b></TableCell>

                                                {percentageCalc((dataAnomaly.achieved + dataSr.achieved), (dataAnomaly.total + dataSr.total))}
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>


                        </CardBody>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={7} >
                    <Card className={classes.card} style={{ marginBottom: "2px" }}>
                    {chartState.loading ? <SpinnerChart />: null}
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
                            <Bar data={dataChartAnomaly} options={options} />
                        </CardBody>

                    </Card>
                    <Card className={classes.card}>
                    {chartState.loading ? <SpinnerChart />: null}
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
                            <Bar data={dataChartSr} options={options2} />
                        </CardBody>

                    </Card>

                </Grid>
            </GridContainer>

        </div>
    );
}

