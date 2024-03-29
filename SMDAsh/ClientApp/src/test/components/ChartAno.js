import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getDataThunk } from '../actions/chartAnoActions';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { ButtonGroup, Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { ToggleButtonGroup } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';


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
  buttonGreen: {
    backgroundColor: '#4caf50',
    color: '#FFF',
    '&:hover': {
      backgroundColor: 'green',
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

export default function ChartAno() {
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
  const chartState = useSelector((state) => state.chartAno,[])||[];
  const [chartTable, setChartTable] = useState(chartState.dataTable);
  const [filter, setFilter] = useState('1 Months');
  const classes = useStyles();

  useEffect(() => {
    if(chartState.loading)dispatch(getDataThunk());
    if(!chartState.loading && chartState.dataTable.length > 0) {orginizeData(chartState.dataTable,filter)}
    console.log(chartState,chartTable);
  }, [chartState.loading]);
  

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      console.log(event,newFilter);
      orginizeData(chartState.dataTable,newFilter);
    }
  };

  const orginizeData = (dt, filter) => {
    console.log(filter)
    let datatable = dt;
    switch (filter) {
      case '1 Months':
        datatable = datatable.filter((item,i) => {
          return i>= datatable.length-4;
        });
        break;
      case '3 Months':
        datatable = datatable.filter((item,i) => {
          return i>= datatable.length-13;
        });
        break;
      case '6 Months':
        datatable = datatable.filter((item,i) => {
          return i>= datatable.length-26;
        });
        break;
      case 'Year' : 
      datatable = datatable.filter((item,i) => {
        return i>= datatable.length-52;
      });
        break;
      default:
        break;
    }
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
      newChartArrays.tealBacklog.push(0);
      newChartArrays.ocpBacklog.push(0);
    }
    const newChartData = {
      datasets: [
        {
          label: 'In',
          data: newChartArrays.in,
          backgroundColor: '#0066cc',
        },
        {
          label: 'Out',
          data: newChartArrays.out,
          backgroundColor: '#ff4500',
        },
        {
          label: 'line Backlog',
          data: newChartArrays.backlog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: '#0066cc',
          borderColor: '#0066cc',
        },
        {
          label: 'Line Teal Backlog',
          data: newChartArrays.tealBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: '#ffbf00',
          borderColor: '#ffbf00',
        },
        {
          label: 'Line OCP Backlog',
          data: newChartArrays.ocpBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: '#cc0000',
          borderColor: '#cc0000',
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
                className={classes.btn}
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
                className={classes.buttonGreen + ' ' + classes.btn}
              >
                <TableChartIcon className={classes.buttonicon} />
                Table PNG
              </Button>
            </Grid>

            <MaterialTable
              title='Anomaly'
              columns={statecolumns.columns}
              data={chartTable}
              options={{
                search: false
              }}
            />
          </CardBody>
        </Card>
        <Card xs={12} sm={12} md={12} className={classes.card}>
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
                className={classes.buttonGreen + ' ' + classes.btn}
              >
                <GetAppIcon className={classes.buttonicon} />
                Chart PNG
              </Button>
            </Grid>
            {!chartState.loading && <Bar
              data={chartData}
              width='670vw'
              height='400vh'
              options={{
                title: {
                  display: true,
                  text: 'Anomaly : Input / Output / Week',
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
            />}
            
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
