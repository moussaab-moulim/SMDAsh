import React, { useState } from "react";
import GridContainer from '../../components/Grid/GridContainer.js';
import CardBody from '../../components/Card/CardBody.js';
import { Grid, Form, TextField } from '@material-ui/core';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function LoginComponent() {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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
                            <form md={12} className={classes.root} noValidate autoComplete="off" >
                                <TextField fullWidth
                                    id="username" label="Username"
                                    type="email"
                                    value={userName}
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
}
