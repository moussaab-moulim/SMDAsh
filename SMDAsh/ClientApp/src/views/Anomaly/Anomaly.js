import React from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import ChartAno from "components/Anomaly/ChartAno";
import BacklogByOwnerAno from "components/Anomaly/BacklogByOwnerAno";
import TicketAssignedAno from "components/Anomaly/TicketAssignedAno";
import SlaByProjectAno from "components/Anomaly/SlaByProjectAno";
import 'chartjs-plugin-labels';


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


  const classes = useStyles();
  return (
    <div>

      <ChartAno />
      <BacklogByOwnerAno />
      <TicketAssignedAno />
      <SlaByProjectAno />
      
    </div>
  );
}
