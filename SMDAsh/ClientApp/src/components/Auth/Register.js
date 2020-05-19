import React, { useState } from "react";
import GridContainer from '../../components/Grid/GridContainer.js';
import CardBody from '../../components/Card/CardBody.js';
import { Grid, Form, TextField } from '@material-ui/core';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/auth/AuthActionCreators';



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

 const RegisterComponent = ({ dispatchRegisterAction }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatchRegisterAction(firstName, lastName, username, password,
      ()=> window.location.href = "/admin",
      (message) => console.log(`Error: ${message}`));
  };

  return (
    <div>
      <React.Fragment>
        <GridContainer>
          <Card xs={12} sm={12} md={12}>
            <CardHeader>
              <h2>New User ?</h2>
              <h2>Create an account</h2>
            </CardHeader>
            <CardBody >
              <form onSubmit={handleOnSubmit} md={12} className={classes.root} noValidate autoComplete="off" >
              <TextField fullWidth
                  id="firstname" label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                 <TextField fullWidth
                  id="lastname" label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField fullWidth
                  id="username" label="Username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  Register
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
  dispatchRegisterAction: (firstName, lastName, username, password, onSuccess, onError) =>
    dispatch(registerUser({ firstName, lastName, username, password }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(RegisterComponent);
