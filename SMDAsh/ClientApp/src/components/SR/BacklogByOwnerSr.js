import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBacklogByOwnerSr
} from '../../redux/actions/SR/BacklogByOwnerSrAction';

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

export default function BacklogByOwnerSr() {


    const [chartData, setChartData] = useState(initialChartState);

    const dispatch = useDispatch();
    const yearsInState = useSelector((state) => state.yearsIn, []) || [];
    const [yearsIn, setYearsIn] = useState(yearsInState.dataTable);

    const chartState = useSelector((state) => state.pieBacklogByOwnerSr, []) || [];
    const [chartTable, setChartTable] = useState(chartState.dataTable);

    const [year, setYear] = useState('all');

    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);

    const [total, setTotal] = useState(0);

    const [chartTableOCP, setChartTableOCP] = useState([]);
    const [chartTableRunService, setChartTableRunService] = useState([]);

    const [chartTableOCPToggle, setChartTableOCPToggle] = useState(false);
    const [chartTableRunServiceToggle, setChartTableRunServiceToggle] = useState(false);



    const handleChangeYears = (event) => {
        setYear(event.target.value);
        setReloadData((prevState) => { return !prevState });
    };

    const toggleOCP = () => {
        setChartTableOCPToggle(!chartTableOCPToggle);
    }
    const toggleRunService = () => {
        setChartTableRunServiceToggle(!chartTableRunServiceToggle);
    }


    useEffect(() => {

        if (chartState.loading || yearsInState.loading || reloardData) {
            dispatch(getYearsIn());
            dispatch(getBacklogByOwnerSr("sr", year));
            setReloadData(false);
        }


        if (!chartState.loading && chartState.dataTable.length > 0) {

            orginizeData();
            setYearsIn(yearsInState.dataTable);

        }


    }, [chartState.loading, year, chartTableOCPToggle, chartTableRunServiceToggle]);



    const dynamicColors = function () {

        let r = Math.floor(Math.random() * 100 + 130);
        let g = Math.floor(Math.random() * 100 + 130);
        let b = Math.floor(Math.random() * 100 + 130);
        return "rgb(" + r + "," + g + "," + b + ")";
 
    };

    const orginizeData = () => {

        const data = chartState.dataTable;
        let dataTable = [];
        let total = 0;
        const labels = [];
        const counts = [];
        const backgroundColor = [];
        const hoverBackgroundColor = [];

        const newChartArrays = {
            Status: [],
            CountOfStatus: [],
        };
        const OCP = data.filter(status => status.assignedToService === "OCP");
        const RunService = data.filter(status => status.assignedToService === "Run service");

        if (chartTableRunServiceToggle && chartTableOCPToggle) {
            for (let i = 0; i < data.length; i++) {
                labels.push(data[i].status)
                counts.push(data[i].countStatus)
                dataTable.push(data[i])

                backgroundColor.push(dynamicColors());
               
            }

        }

        if (!chartTableRunServiceToggle && !chartTableOCPToggle) {

            labels.push("OCP");
            const countsOcp = OCP.reduce(function (tot, arr) {
                return tot + arr.countStatus;
            }, 0);
            backgroundColor.push(dynamicColors());
            counts.push(countsOcp);

            labels.push("Run Service");
            const countsRunService = RunService.reduce(function (tot, arr) {
                return tot + arr.countStatus;
            }, 0);
            backgroundColor.push(dynamicColors());
            counts.push(countsRunService);

        }


        if (!chartTableOCPToggle && chartTableRunServiceToggle) {
            labels.push("OCP");

            const countsOcp = OCP.reduce(function (tot, arr) {
                return tot + arr.countStatus;
            }, 0);
            counts.push(countsOcp);

            for (let i = 0; i < RunService.length; i++) {
                labels.push(RunService[i].status)
                counts.push(RunService[i].countStatus)
                dataTable.push(RunService[i])

                backgroundColor.push(dynamicColors());
               
            }
        }

        if (!chartTableRunServiceToggle && chartTableOCPToggle) {
            labels.push("Run Service");

            const countsRunService = RunService.reduce(function (tot, arr) {
                return tot + arr.countStatus;
            }, 0);
            counts.push(countsRunService);

            for (let i = 0; i < OCP.length; i++) {
                labels.push(OCP[i].status)
                counts.push(OCP[i].countStatus)
                dataTable.push(OCP[i])

                backgroundColor.push(dynamicColors());
                
            }
        }
        
        for (let i = 0; i < data.length; i++) {
            total += data[i].countStatus;
        }

        const newChartData = {
            datasets: [{
                data: counts,
                backgroundColor: backgroundColor,
                
            }],
            labels: labels,
            
        };



        setChartData(newChartData);
        setChartTable(data);
        setChartTableOCP(OCP);
        setChartTableRunService(RunService);
        setTotal(total);


    };



    return (
        <div >
            <GridContainer xs={12}
                sm={12}
                md={12}>
                <Grid item xs={4} sm={12} md={4} >
                    <Card xs={6} sm={6} md={6} className={classes.card}>
                        {chartState.loading ? <SpinnerChart /> : null}
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
                                    variant='contained' style={{ marginTop: 25 }}
                                    className={classes.buttonTealColor + ' ' + classes.btn}
                                >
                                    <TableChartIcon className={classes.buttonicon} />
                                 Table PNG
                                </Button>

                                <FormControl className={classes.formControl} style={{ minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={year}
                                        onChange={handleChangeYears}
                                    >
                                        <MenuItem value="all">
                                            <em>All</em>
                                        </MenuItem>
                                        {
                                            yearsIn.map((row) => (
                                                <MenuItem value={row.yearIn}>{row.yearIn}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>

                            </Grid>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Owner</TableCell>
                                            <TableCell >Count Of Status</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow style={{
                                            backgroundColor: '#cecece',
                                        }}
                                        >

                                            <TableCell align="left"><b>OCP</b></TableCell>
                                            <TableCell align="center">
                                                <Grid item

                                                    container
                                                    direction='row'
                                                    justify='space-between'
                                                    alignItems='center'
                                                >
                                                    <b>{
                                                        chartTableOCP.reduce(function (tot, arr) {
                                                            return tot + arr.countStatus;
                                                        }, 0)
                                                    }</b>
                                                    {chartTableOCPToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleOCP() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleOCP() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" /> 
                                                            </IconButton>
                                                        )
                                                    }

                                                </Grid>

                                            </TableCell>
                                        </TableRow>

                                        {chartTableOCPToggle ? (
                                            chartTableOCP.map((row) => (

                                                <TableRow >

                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">{row.countStatus}</TableCell>

                                                </TableRow>
                                            ))
                                        )
                                            : null
                                        }


                                        <TableRow style={{
                                            backgroundColor: '#cecece',

                                        }}
                                        >
                                            <TableCell align="left"><b>Run Service</b></TableCell>
                                            <TableCell align="center">
                                                <Grid item

                                                    container
                                                    direction='row'
                                                    justify='space-between'
                                                    alignItems='center'
                                                >
                                                    <b>{
                                                        chartTableRunService.reduce(function (tot, arr) {
                                                            return tot + arr.countStatus;
                                                        }, 0)
                                                    }</b>
                                                    {chartTableRunServiceToggle ? (
                                                        <IconButton style={{ padding: '0px' }} onClick={() => { toggleRunService() }} color="primary" aria-label="add to shopping cart">
                                                            <RemoveIcon fontSize="small" />

                                                        </IconButton>
                                                    ) : (
                                                            <IconButton style={{ padding: '0px' }} onClick={() => { toggleRunService() }} color="primary" aria-label="add to shopping cart">
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )
                                                    }

                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        {chartTableRunServiceToggle ? (
                                            chartTableRunService.map((row) => (

                                                <TableRow >

                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">{row.countStatus}</TableCell>

                                                </TableRow>
                                            ))
                                        )
                                            : null
                                        }
                                        <TableRow >
                                            <TableCell align="left"><b>Total :</b></TableCell>
                                            <TableCell style={{
                                                color: '#008080'

                                            }} align="left"><b>{total}</b></TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </CardBody>


                    </Card>

                </Grid>
                <Grid item xs={8} sm={12} md={8} >
                    <Card xs={6} sm={6} md={6} className={classes.card}>
                        {chartState.loading ? <SpinnerChart /> : null}
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

                            <Pie data={chartData} options={{
                                plugins: {
                                    labels: {

                                        render: 'value',
                                        fontSize: 12,

                                        fontColor: '#000',
                                        fontFamily: '"Lucida Console", Monaco, monospace'
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Backlog Split Per Owner',
                                    fontSize: 20,
                                },
                                responsive: true,
                            }} />



                        </CardBody>

                    </Card>

                </Grid>

            </GridContainer>
        </div>
    );
}




