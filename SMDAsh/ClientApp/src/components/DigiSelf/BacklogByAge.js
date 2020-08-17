import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import {
    getBacklogByAgeDigiSelf,
} from '../../redux/actions/DigiSelf/backlogByAgeDSAction';


// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { Button } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function BacklogByAge() {

    const [chartData, setChartData] = useState(initialChartState);

    const dispatch = useDispatch();

    const chartBacklogByAgeState = useSelector((state) => state.backlogByAgeDS, []) || [];

    const classes = useStyles();
    const [reloardData, setReloadData] = useState(false);

    const [chartTable, setChartTable] = useState([]);

    const [total, setTotal] = useState(0);



    useEffect(() => {

        if (chartBacklogByAgeState.loading || reloardData) {

            dispatch(getBacklogByAgeDigiSelf());
            setReloadData(false);

        }
        if (!chartBacklogByAgeState.loading && chartBacklogByAgeState.dataTable.length > 0) {

            orginizeData();

        }

    }, [chartBacklogByAgeState.loading]);



    const dynamicColors = function () {

        let r = Math.floor(Math.random() * 100 + 130);
        let g = Math.floor(Math.random() * 100 + 130);
        let b = Math.floor(Math.random() * 100 + 130);
        return "rgb(" + r + "," + g + "," + b + ")";

    };

    const orginizeData = () => {

        let dataTable = [];
        let total = 0;

        const labels = ["5 days or less", "6 to 12 days", "12 to 20 days", "20 and more"];
        const counts = [];

        const backgroundColor = [];

        const data = chartBacklogByAgeState.dataTable.slice(-1)[0];
        console.log(data);



        counts.push(data.cat0To5)
        counts.push(data.cat6To12)
        counts.push(data.cat12To20)
        counts.push(data.cat20More)
        dataTable.push({ageCategory: "5 days or less", count: data.cat0To5})
        dataTable.push({ageCategory: "6 to 12 days", count: data.cat6To12})
        dataTable.push({ageCategory: "12 to 20 days", count: data.cat12To20})
        dataTable.push({ageCategory: "20 and more", count: data.cat20More})
    

        backgroundColor.push(dynamicColors());


        for (let i = 0; i < dataTable.length; i++) {
            total += dataTable[i].count;
        }

        const newChartData = {
            datasets: [{
                data: counts,
                backgroundColor: backgroundColor,

            }],
            labels: labels,

        };

        setChartData(newChartData);
        setChartTable(dataTable);
        setTotal(total);

    };



    return (
        <div>
            <GridContainer>
                <Grid item xs={12} sm={12} md={4} >
                    <Card className={classes.card}>

                        {chartData.loading ? <SpinnerChart /> : null}
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
                                            <TableCell>Age Category</TableCell>
                                            <TableCell >Count Of ID</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {
                                            chartTable.map((row) => (

                                                <TableRow className={classes.paddingTable}>

                                                    <TableCell align="left">{row.ageCategory}</TableCell>
                                                    <TableCell align="left">{row.count}</TableCell>

                                                </TableRow>
                                            ))
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

                <Grid item xs={12} sm={12} md={8} >
                    <Card className={classes.card}>
                        {chartData.loading ? <SpinnerChart /> : null}
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
                                        fontSize: 13,

                                        fontColor: '#000',
                                        fontFamily: '"Lucida Console", Monaco, monospace'
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Backlog By Age',
                                    fontSize: 20,
                                },
                                responsive: true,

                                legend: {
                                    display: true,
                                    position: 'top',
                                    labels: {
                                        fontSize: 12,
                                        usePointStyle: true
                                    },
                                },

                            }} />

                        </CardBody>

                    </Card>

                </Grid>

            </GridContainer>

        </div >
    );
}
