import React, { useState } from "react";
import GridContainer from '../../components/Grid/GridContainer.js';
import CardBody from '../../components/Card/CardBody.js';
import { Grid, Form, TextField } from '@material-ui/core';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/auth/AuthActionCreators';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            //margin: theme.spacing(0.4),

        },
    },
    buttonAuth: {
        marginTop: 20,
    }
}));

const LoginComponent = ({ dispatchLoginAction }) => {
    const classes = useStyles();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        dispatchLoginAction(username, password,
          ()=> window.location.href = "/admin",
          (message) => console.log(`Error: ${message}`));
      };

    return (
        <div>
            <React.Fragment>
                <GridContainer>
                    <Card xs={12} sm={12} md={12}>
                        <CardHeader>
                            <h3>Have an Account ?</h3>
                            <h4><b>Login here</b></h4>
                        </CardHeader>
                        <CardBody >
                            <form onSubmit={handleOnSubmit} md={12} className={classes.root} noValidate autoComplete="off" >
                                <TextField fullWidth
                                    id="username" label="Username"
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button 
                                className={classes.buttonAuth}
                                 variant="contained" 
                                 fullWidth 
                                 color="primary"
                                 type="submit"
                                 >
                                    Login
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </GridContainer>
            </React.Fragment>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (username, password, onSuccess, onError) =>
      dispatch(loginUser({ username, password }, onSuccess, onError))
  });
export default connect(null, mapDispatchToProps)(LoginComponent);
