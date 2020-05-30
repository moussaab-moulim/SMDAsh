import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import './spinnerChart.css';

const SpinnerChart = () => (
    <React.Fragment>
        <div id="spinner-fade">
            <CircularProgress className="spinner" style={{color:"#008080"}}/>
        </div>
    </React.Fragment>
);

export default SpinnerChart;
