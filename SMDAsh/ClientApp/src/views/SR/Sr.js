import React from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import ChartSr from "components/SR/ChartSr";
import BacklogByOwnerSr from "components/SR/BacklogByOwnerSr";
import TicketAssignedSr from "components/SR/TicketAssignedSr";

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

export default function Sr() {


  const classes = useStyles();
  return (
    <div>

      <TicketAssignedSr />
      <ChartSr />
      <BacklogByOwnerSr />

    </div>
  );
}
