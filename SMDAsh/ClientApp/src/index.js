import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import { connect } from "react-redux";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import AuthPage from "./views/Auth/AuthPage.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import userReducer from "./reducers/Auth/userReducer.js";

const hist = createBrowserHistory();
/*
const defaultState = {
  userId: null,
  fullName: null,
  token: null,
  isLoggedIn: false
};
const userInfo = localStorage.getItem('USER_INFO');
const user = userInfo ? JSON.parse(userInfo) : defaultState;
*/

/*
let state = Store.getState();
    let userr = state.user.whatEverYouNeed;
*/
const GetRoutes = ({store} ) => {
  
  const getstore=store.getState();
  const user= getstore.user;
  {console.log(user)}
  return (
      
      !user.isLoggedIn ?
        (<Switch>
          
          <Route path="/auth" component={AuthPage} />
          <Redirect to="/auth" />
        </Switch>) :
        (<Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect to="/Admin" />
        </Switch>)
       
        
        
  );
};
const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(GetRoutes);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router history={hist}>
      <GetRoutes store={store} />
        
      </Router>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById("root")
);