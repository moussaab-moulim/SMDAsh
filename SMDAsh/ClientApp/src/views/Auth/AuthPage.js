import React from "react";
import Grid from '@material-ui/core/Grid';
import Login from "../../components/Auth/Login.js"
import Register from "../../components/Auth/Register.js"

export default function AuthPage() {

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item md={5}>
                    <Login />
                </Grid>
               
                <Grid item md={5}>
                    <Register />
                </Grid>



            </Grid>

        </div>
    );
}