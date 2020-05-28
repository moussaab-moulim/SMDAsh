import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

import AuthPage from './views/Auth/authpage.component';

import Spinner from './components/spinner/spinner.component';
import { logoutUser } from './redux/actions/auth/authActionCreators';
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

const App = ( store ) => {
  
console.log(store.user);
var user = store.user;
  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={2000}
        hideProgressBar transition={Slide} />
      <Spinner />


      {!user.isLoggedIn ?
        (<div className="container my-5">
          <Switch>
            <Route exact path="/auth" component={AuthPage} />
            <Redirect to="/auth" />
          </Switch>
        </div>
        ) :
        (<Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect to="/Admin" />
        </Switch>)
      }
    
    </React.Fragment >
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
