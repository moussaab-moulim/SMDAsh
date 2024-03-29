import React from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import BacklogEfficiencyDigiSelf from "components/DigiSelf/BacklogEfficiency";
import BacklogPerTeamDigiSelf from "components/DigiSelf/BacklogPerTeam";
import BacklogByAge from "components/DigiSelf/BacklogByAge";
import BacklogEvolutionByAge from "components/DigiSelf/BacklogEvolutionByAge";
import SlaClosedCurrentMonth from "components/DigiSelf/SlaClosedCurrentMonth";

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

export default function Digiself() {

  const classes = useStyles();
  return (
    <div>
      <BacklogEfficiencyDigiSelf />
      <BacklogPerTeamDigiSelf />
      <BacklogByAge />
      <BacklogEvolutionByAge />
      <SlaClosedCurrentMonth />

    </div>
  );
}
