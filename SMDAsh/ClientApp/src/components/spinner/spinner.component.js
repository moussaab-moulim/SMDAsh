import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import './spinner.css';

const Spinner = ({ isLoading }) => (
    <React.Fragment>
        {
            isLoading ? (<div id="spinner-fade">
                <CircularProgress className="spinner" style={{color:"#008080"}}/>
            </div>) : null}
    </React.Fragment>
);

const mapStateToProps = state => ({
    isLoading: state.loading
});
export default connect(mapStateToProps)(Spinner);
