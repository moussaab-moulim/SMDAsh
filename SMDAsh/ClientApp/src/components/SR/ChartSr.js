import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData,  
  getBacklogSrThreeMonth, 
  getBacklogSrOneMonth, 
  getBacklogSrSixMonth, 
  getBacklogSrOneYear, 
  getBacklogSrAll } from '../../redux/actions/SR/chartSrActions';

import {COLOR_TEAL, COLOR_ORANGE, COLOR_BLUE, COLOR_YELLOW, COLOR_RED} from '../../redux/constants';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { ToggleButtonGroup } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
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

export default function ChartSr() {
  const [statecolumns, setStatecolumns] = useState({
    columns: [
      { title: 'Year/Week', field: 'yearWeek' },
      { title: 'In', field: 'in', type: 'numeric' },
      { title: 'Out', field: 'out', type: 'numeric' },
      { title: 'Backlog', field: 'backlog', type: 'numeric' },
      { title: 'Teal Backlog', field: 'tealBacklog', type: 'numeric' },
      { title: 'OCP Backlog', field: 'ocpBacklog', type: 'numeric' },
    ],
  });
  const [chartData, setChartData] = useState(initialChartState);

  const dispatch = useDispatch();
  const chartState = useSelector((state) => state.chartSr,[])||[];
  const [chartTable, setChartTable] = useState(chartState.dataTable);
  const [filter, setFilter] = useState('1 Months');
  const classes = useStyles();
  const[reloardData,setReloadData]=useState(true);

  useEffect(() => {
    if (chartState.loading || reloardData) {

      if (filter == "1 Months") {
        dispatch(getBacklogSrOneMonth());
  
      } else if (filter == "3 Months") {
        dispatch(getBacklogSrThreeMonth());
      }
      else if (filter == "6 Months") {
        dispatch(getBacklogSrSixMonth());
      }
      else if (filter == "Year") {
        dispatch(getBacklogSrOneYear());
      }
      else if (filter == "All") {
        dispatch(getBacklogSrAll());
      }
      setReloadData(false);
    } 
    
    if (!chartState.loading && chartState.dataTable.length > 0) { 
      orginizeData()
     }

  }, [chartState.loading, filter]);


  const handleFilter =(event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setReloadData((prevState)=>{return !prevState});
    }
  };

  
  const orginizeData = () => {
  
    let datatable = chartState.dataTable;
    const newChartArrays = {
      yearWeek: [],
      in: [],
      out: [],
      backlog: [],
      tealBacklog: [],
      ocpBacklog: [],
    };

    for (let i = 0; i < datatable.length; i++) {
      newChartArrays.yearWeek.push(datatable[i].yearWeek);
      newChartArrays.in.push(datatable[i].in);
      newChartArrays.out.push(datatable[i].out);
      newChartArrays.backlog.push(datatable[i].backlog);
      newChartArrays.tealBacklog.push(Math.floor(Math.random() * 101)+150);
      newChartArrays.ocpBacklog.push(Math.floor(Math.random() * 101)+150);
    }
    const newChartData = {
      datasets: [
        {
          label: 'In',
          data: newChartArrays.in,
          backgroundColor: COLOR_TEAL,
        },
        {
          label: 'Out',
          data: newChartArrays.out,
          backgroundColor: COLOR_ORANGE,
        },
        {
          label: 'Backlog',
          data: newChartArrays.backlog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_BLUE,
          borderColor: COLOR_BLUE,
        },
        {
          label: 'Teal Backlog',
          data: newChartArrays.tealBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_YELLOW,
          borderColor: COLOR_YELLOW,
        },
        {
          label: 'OCP Backlog',
          data: newChartArrays.ocpBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_RED,
          borderColor: COLOR_RED,
        },
      ],
      labels: newChartArrays.yearWeek,
    };
   
    setChartData(newChartData);
    setChartTable(datatable);
  };

  

  return (
    <div>
      <GridContainer>
        <Card xs={12} sm={12} md={12} className={classes.card}>
          {chartState.loading ? <SpinnerChart />: null}
          <CardBody>
            <Grid
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
                color='secondary'
                className={classes.btn + " " + classes.buttonRedColor}
              >
                <GetAppIcon className={classes.buttonicon} />
                All PNG
              </Button>
              <ToggleButtonGroup
                value={filter}
                className={classes.btn}
                exclusive
                onChange={handleFilter}
                aria-label='text alignment'
                size='small'
              >
                <ToggleButton
                  className={classes.togglbtn}
                  value='1 Months'
                  aligned
                >
                  1 Months
                </ToggleButton>
                <ToggleButton className={classes.togglbtn} value='3 Months'>
                  3 Months
                </ToggleButton>
                <ToggleButton className={classes.togglbtn} value='6 Months'>
                  6 Months
                </ToggleButton>
                <ToggleButton className={classes.togglbtn} value='Year'>
                  Year
                </ToggleButton>
                <ToggleButton className={classes.togglbtn} value='All'>
                  All
                </ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant='contained'
                className={classes.buttonTealColor + ' ' + classes.btn}
              >
                <TableChartIcon className={classes.buttonicon} />
                Table PNG
              </Button>
            </Grid>

            <MaterialTable
              title='Service Request'
              columns={statecolumns.columns}
              data={chartTable}
              options={{
                search: false
              }}
            />
          </CardBody>
        </Card>
        <Card xs={12} sm={12} md={12} className={classes.card}>
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
            <Bar
              data={chartData}
              width='670vw'
              height='400vh'
              options={{
                title: {
                  display: true,
                  text: 'Service Request : Input / Output / Week',
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
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
            
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
