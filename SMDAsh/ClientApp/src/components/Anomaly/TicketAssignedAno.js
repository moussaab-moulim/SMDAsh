import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
    getServices
} from '../../redux/actions/Params/serviceActions';
import {
    getTicketAssignedOcpAnomaly
} from '../../redux/actions/Anomaly/TicketAssignedAnoActions';

import { getYearsIn } from '../../redux/actions/Params/yearActions';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { IconButton, Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { ToggleButtonGroup } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import SpinnerChart from './../spinner/SpinnerChart/spinnerChart.component';


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

export default function TicketAssignedAno() {


    const [chartDataOCP, setChartDataOCP] = useState(initialChartState);
    const [chartDataRS, setChartDataRS] = useState(initialChartState);

    const dispatch = useDispatch();

    const servicesInState = useSelector((state) => state.services, []) || [];
    const chartTicketAssignedOcpState = useSelector((state) => state.ticketAssignedOcpAno, []) || [];
    const chartTicketAssignedRunServiceState = useSelector((state) => state.ticketAssignedRunServiceAno, []) || [];

    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);

    const [chartTableOCP, setChartTableOCP] = useState([]);
    const [chartTableRunService, setChartTableRunService] = useState([]);

    const [totalOCP, setTotalOCP] = useState(0);
    const [totalRS, setTotalRS] = useState(0);

    const [seeMoreOCP, setSeeMoreOCP] = useState(false);
    const [seeLessOcp, setSeeLessOcp] = useState(false);

    const toggleOCP = () => {
        setSeeMoreOCP(!seeMoreOCP);
    }


    useEffect(() => {

        if (chartTicketAssignedOcpState.loading || reloardData) {

            dispatch(getServices());
            dispatch(getTicketAssignedOcpAnomaly());
            setReloadData(false);

        }

        if (!chartTicketAssignedOcpState.loading && chartTicketAssignedOcpState.dataTable.length > 0) {

            orginizeData();

        }

    }, [chartTicketAssignedOcpState.loading]);



    const dynamicColors = function () {

        let r = Math.floor(Math.random() * 100 + 130);
        let g = Math.floor(Math.random() * 100 + 130);
        let b = Math.floor(Math.random() * 100 + 130);
        return "rgb(" + r + "," + g + "," + b + ")";

    };

    const orginizeData = () => {

        let dataTableOCP = [];
        let dataTableRS = [];

        let totalOCP = 0;
        let totalRS = 0;

        const labelsOCP = [];
        const labelsRS = [];

        const countsOCP = [];
        const countsRS = [];

        const backgroundColorOCP = [];
        const backgroundColorRS = [];

        const services = servicesInState.dataTable;
        const serviceOcp = services.filter(s => s.assignedToService === "OCP");
        const serviceRunService = services.filter(s => s.assignedToService === "Run service");


        if (serviceOcp.length) {

            console.log("OCP");
            const dataOCP = chartTicketAssignedOcpState.dataTable;

            for (let i = 0; i < dataOCP.length; i++) {
                labelsOCP.push(dataOCP[i].application)
                countsOCP.push(dataOCP[i].count)
                dataTableOCP.push(dataOCP[i])

                backgroundColorOCP.push(dynamicColors());
            }

        }
        if (serviceRunService.length) {
            console.log("RS");
        }


        for (let i = 0; i < dataTableOCP.length; i++) {
            totalOCP += dataTableOCP[i].count;
        }
        for (let i = 0; i < dataTableRS.length; i++) {
            totalRS += dataTableRS[i].count;
        }

        const newChartDataOCP = {
            datasets: [{
                data: countsOCP,
                backgroundColor: backgroundColorOCP,

            }],
            labels: labelsOCP,

        };
        const newChartDataRS = {
            datasets: [{
                data: countsRS,
                backgroundColor: backgroundColorRS,

            }],
            labels: labelsRS,

        };


        setChartDataOCP(newChartDataOCP);
        setChartDataRS(newChartDataRS);

        setChartTableOCP(dataTableOCP);
        setChartTableRunService(dataTableRS);

        setTotalOCP(totalOCP);
        setTotalRS(totalRS);


    };



    return (
        <div id="tablecsspaddingtd">
            {
                chartTicketAssignedOcpState.dataTable.length ?
                    <GridContainer>
                        <Grid item xs={12} sm={12} md={4} >
                            <Card className={classes.card}>

                                {chartDataOCP.loading ? <SpinnerChart /> : null}
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

                                    <TableContainer component={Paper} >
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Owner</TableCell>
                                                    <TableCell >Count Of Status</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {seeMoreOCP ? (
                                                    chartTableOCP.map((row) => (

                                                        <TableRow className={classes.paddingTable}>

                                                            <TableCell align="left">{row.application}</TableCell>
                                                            <TableCell align="left">{row.count}</TableCell>

                                                        </TableRow>
                                                    ))

                                                )
                                                    :
                                                    (
                                                        chartTableOCP.slice(0, 10).map((row) => (

                                                            <TableRow className={classes.paddingTable}>

                                                                <TableCell align="left">{row.application}</TableCell>
                                                                <TableCell align="left">{row.count}</TableCell>

                                                            </TableRow>
                                                        ))

                                                    )



                                                }

                                                {
                                                    seeMoreOCP ?

                                                        <TableRow href="" className={classes.paddingTable} onClick={() => { toggleOCP() }}>
                                                            
                                                                <TableCell align="right"><b>See Less</b></TableCell>
                                                                <TableCell align="left">
                                                                    <KeyboardArrowUpIcon fontSize="small" />
                                                                </TableCell>
                                                            

                                                        </TableRow>
                                                        :
                                                        <TableRow href="" className={classes.paddingTable} onClick={() => { toggleOCP() }}>
                                                            
                                                                <TableCell align="right"><b>See More</b></TableCell>
                                                                <TableCell align="left"><b>...</b></TableCell>
                                                            

                                                        </TableRow>
                                                }







                                                <TableRow >
                                                    <TableCell align="left"><b>Total :</b></TableCell>
                                                    <TableCell style={{
                                                        color: '#008080'

                                                    }} align="left"><b>{totalOCP}</b></TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </CardBody>

                            </Card>

                        </Grid>

                        <Grid item xs={12} sm={12} md={8} >
                            <Card className={classes.card}>
                                {chartDataOCP.loading ? <SpinnerChart /> : null}
                                <CardBody>
                                    <Grid

                                        container
                                        direction='row'
                                        justify='flex-end'
                                        alignItems='left'
                                    >
                                        <Button
                                            variant='contained'
                                            className={classes.buttonTealColor + ' ' + classes.btn}
                                        >
                                            <GetAppIcon className={classes.buttonicon} />
                Chart PNG
              </Button>
                                    </Grid>

                                    <Pie height="196" data={chartDataOCP} options={{
                                        plugins: {
                                            labels: {
                                                render: 'value',
                                                fontSize: 13,

                                                fontColor: '#000',
                                                fontFamily: '"Lucida Console", Monaco, monospace'
                                            },
                                        },
                                        title: {
                                            display: true,
                                            text: 'Ticket Assigned To OCP',
                                            fontSize: 20,
                                        },
                                        responsive: true,
                                        cutoutPercentage: 50,
                                        legend: {
                                            display: true,
                                            position: 'bottom',
                                            labels: {
                                                fontSize: 9,
                                                usePointStyle: true
                                            },
                                        },

                                    }} />









                                </CardBody>

                            </Card>

                        </Grid>

                    </GridContainer>
                    : null
            }
        </div >
    );
}




