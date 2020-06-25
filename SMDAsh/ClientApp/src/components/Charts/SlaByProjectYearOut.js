import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getSlaByProjectYearOutAnomaly } from '../../redux/actions/Anomaly/SlaByProjectAnoAction';
import { getSlaByProjectYearOutSr } from '../../redux/actions/SR/SlaByProjectSrAction';
import { getSlaByProjectYearOutEvolution } from '../../redux/actions/Evolution/SlaByProjectEvolutionAction';

import { getYearsOut } from '../../redux/actions/Params/yearActions';



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
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert';

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

export default function SlaByProjectYearOut(props) {

    let chartState = { loading: true, dataTable:[] };

    const [chartData, setChartData] = useState(initialChartState);
    const dispatch = useDispatch();
    const classes = useStyles();

    const yearsOutState = useSelector((state) => state.yearsOut, []) || [];
    const [yearsOut, setYearsOut] = useState(yearsOutState.dataTable);

    const [reloardData, setReloadData] = useState(false);
    const [year, setYear] = useState('all');
    const [total, setTotal] = useState(0);
    const [chartTable, setChartTable] = useState([]);

    const ano = useSelector((state) => state.slaByProjectYearOutAno, []) || [];
    const sr = useSelector((state) => state.slaByProjectYearOutSr, []) || [];
    const evolution = useSelector((state) => state.slaByProjectYearOutEvolution, []) || [];

    if(props.categorie == "anomalie"){
        chartState = ano;
    }else if(props.categorie == "sr"){
        chartState = sr;
    }else if(props.categorie == "evolution"){
        chartState = evolution;
    }
    

    const handleChangeYears = (event) => {
        setYear(event.target.value);
        setReloadData((prevState) => { return !prevState });
    };



    useEffect(() => {

        if (chartState.loading || yearsOutState.loading || reloardData) {
            dispatch(getYearsOut());
            if(props.categorie == "anomalie"){
                dispatch(getSlaByProjectYearOutAnomaly(props.categorie, year));
            }else if(props.categorie == "sr"){
                dispatch(getSlaByProjectYearOutSr(props.categorie, year));
            }else if(props.categorie == "evolution"){
                dispatch(getSlaByProjectYearOutEvolution(props.categorie, year));
            }else{
                toast(<Alert severity="error">The category to use on the graphic SLA does not exist !</Alert>, { autoClose: 10000 }) 
            }
            setReloadData(false);
        }

       
        if (!chartState.loading && chartState.dataTable.length > 0) {

            orginizeData();
            setYearsOut(yearsOutState.dataTable);

        }


    }, [chartState.loading, year]);


    const orginizeData = () => {

        const data = chartState.dataTable;
        let dataTable = [];
        let total = 0;
        let ko = 0;
        let ok = 0;
        const labels = [];
        const backgroundColor = [];
        let percentKo = 0;
        let percentOk = 0;
        const counts = [];

        for (let i = 0; i < data.length; i++) {

            ko += data[i].ko;
            ok += data[i].ok;

        }

        total = ko + ok;

        percentKo = (ko*100/total).toFixed(1);
        percentOk = (ok*100/total).toFixed(1);

        labels.push("KO (" + percentKo + "% )");
        backgroundColor.push("rgb(255,58,58)");
        counts.push(ko);
        dataTable.push({ "title":"KO", "value": ko });

        labels.push("OK (" + percentOk+ "% )");
        backgroundColor.push("rgb(0,128,255)");
        counts.push(ok);
        dataTable.push({ "title":"OK", "value": ok });
        console.log(dataTable);

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
        {chartState.dataTable.length > 0?  <GridContainer>
                <Grid item xs={12} sm={12} md={4} >
                    <Card className={classes.card}>
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
                                            yearsOut.map((row) => (
                                                <MenuItem value={row.yearOut}>{row.yearOut}</MenuItem>
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

                                   
                                        {
                                            chartTable.map((row) => (
                                                <TableRow>
                                                <TableCell align="left">{row.title}</TableCell>
                                                <TableCell align="left">{row.value}</TableCell>
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
                                    text: year=='all'? 'SLA All Years': 'SLA Of The Year '+year,
                                    fontSize: 20,
                                },
                                responsive: true,
                                legend: {
                                    display: true,
                                    labels: {
                                        usePointStyle: true
                                    },
                                },
                            }} />



                        </CardBody>

                    </Card>

                </Grid>
            </GridContainer>
      : null}
          
            </div >
    );
}




