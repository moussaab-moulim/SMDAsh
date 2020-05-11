import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/chartAnoActions";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ButtonGroup, Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { ToggleButtonGroup } from '@material-ui/lab';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import ChartAno from "components/ChartAno";
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';



const useStyles = makeStyles((theme) => ({
 
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
}));

export default function Anomaly() {
  /*
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(state => state.chartAno)
  useEffect(() => {
    dispatch(getData());
  }, []);
 
  const [alignment, setAlignment] = React.useState('1 Months');

  const [statecolumns, setStatecolumns] = React.useState({
    columns: [
      { title: 'Year/Week', field: 'YearWeek' },
      { title: 'In', field: 'In', type: 'numeric' },
      { title: 'Out', field: 'Out', type: 'numeric' },
      { title: 'Backlog', field: 'Backlog', type: 'numeric' },
      { title: 'Teal Backlog', field: 'TealBacklog', type: 'numeric' },
      { title: 'OCP Backlog', field: 'OCPBacklog', type: 'numeric' },
    ],
  });
 */
  


  const classes = useStyles();
  return (
    <div>
      <ChartAno></ChartAno>
    </div>
  );
}
