import React, { useState, useEffect } from 'react';
//import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getBacklogEvolutionByAgeDSOneWeek, 
  getBacklogEvolutionByAgeDSOneMonth, 
  getBacklogEvolutionByAgeDSThreeMonth,
  getBacklogEvolutionByAgeDSSixMonth, 
  getBacklogEvolutionByAgeDSOneYear, 
  getBacklogEvolutionByAgeDSAll } from '../../redux/actions/DigiSelf/backlogEvolutionByAgeDSAction';


import {COLOR_TEAL, COLOR_ORANGE, COLOR_BLUE, COLOR_YELLOW } from '../../redux/constants';
import { connect } from 'react-redux';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { ToggleButtonGroup } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

import SpinnerChart from './../spinner/SpinnerChart/spinnerChart.component';
import { formatDiagnostic } from 'typescript';

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

const BacklogEvolutionByAge = () => {
  const [statecolumns, setStatecolumns] = useState({
    columns: [
      { title: 'Date', field: 'day' },
      { title: '12 to 20 days', field: 'in', type: 'numeric' },
      { title: '5 days or less', field: 'out', type: 'numeric' },
      { title: '6 days to 12 days', field: 'in', type: 'numeric' },
      { title: 'more then 20 days', field: 'out', type: 'numeric' },
    ],
  });

  const [chartData, setChartData] = useState(initialChartState);
  const dispatch = useDispatch();
  const chartState = useSelector((state) => state.backlogEvolutionByAgeDS, []) || [];
  const [chartTable, setChartTable] = useState(chartState.dataTable);
  const [filter, setFilter] = useState('Week');
  const classes = useStyles();
  const [reloardData,setReloadData] = useState(false);

  useEffect(() => {
    if (chartState.loading || reloardData) {
     
      if (filter == "Week") {
        dispatch(getBacklogEvolutionByAgeDSOneWeek());
       
      } else if (filter == "1 Months") {
        dispatch(getBacklogEvolutionByAgeDSOneMonth());
        
      } else if (filter == "3 Months") {
        dispatch(getBacklogEvolutionByAgeDSThreeMonth());
        
      }
      else if (filter == "6 Months") {
        dispatch(getBacklogEvolutionByAgeDSSixMonth());
        
      }
      else if (filter == "Year") {
        dispatch(getBacklogEvolutionByAgeDSOneYear());
        
      }
      else if (filter == "All") {
        dispatch(getBacklogEvolutionByAgeDSAll());
        
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
      date: [],
      days12to20: [],
      days5orLess: [],
      days6to12: [],
      morethen20days: [],
    };

    for (let i = 0; i < datatable.length; i++) {
      newChartArrays.date.push(datatable[i].day);
      newChartArrays.days12to20.push(datatable[i].in+10);
      newChartArrays.days5orLess.push(datatable[i].out+10);
      newChartArrays.days6to12.push(datatable[i].in+12);
      newChartArrays.morethen20days.push(datatable[i].out+5);
    }
    const newChartData = {
      datasets: [
        {
          label: '12 to 20 days',
          data: newChartArrays.days12to20,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_TEAL,
          borderColor: COLOR_TEAL,
        },
        {
          label: '5 days or less',
          data: newChartArrays.days5orLess,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_ORANGE,
          borderColor: COLOR_ORANGE,
        },
        {
          label: '6 to 12 days',
          data: newChartArrays.days6to12,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: COLOR_BLUE,
          borderColor: COLOR_BLUE,
        },
        {
            label: 'more then 20 days',
            data: newChartArrays.morethen20days,
            order: 1,
            type: 'line',
            fill: false,
            backgroundColor: COLOR_YELLOW,
            borderColor: COLOR_YELLOW,
          },
      ],
      labels: newChartArrays.date,
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
                    value='Week'
                    aligned
                  >
                    1W
              </ToggleButton>
                  <ToggleButton className={classes.togglbtn} value='1 Months'>
                    1M
              </ToggleButton>
              <ToggleButton className={classes.togglbtn} value='3 Months'>
                    3M
              </ToggleButton>
                  <ToggleButton className={classes.togglbtn} value='6 Months'>
                    6M
              </ToggleButton>
                  <ToggleButton className={classes.togglbtn} value='Year'>
                    1Y
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
                title='Backlog Evolution (by Age Category)'
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
                    text: 'Backlog Evolution by Age Category',
                    fontSize: 20,
                  },
                  plugins: {
                    labels: {
                      render: 'value',
                      fontSize: 10,

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

const mapStateToProps = state => {
  return {
    chartState: state.chartAno
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getBacklogEvolutionByAgeDSOneWeek: () => dispatch(getBacklogEvolutionByAgeDSOneWeek()),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(BacklogEvolutionByAge);
