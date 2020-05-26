import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from "components/CustomButtons/Button.js";
import { logoutUser } from 'redux/actions/authActionCreators';
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

const AdminNavbarLinks = ({ user, dispatchLogoutAction }) => {

  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  return (
    <div>

      <div className={classes.manager}>
        <Button
          style={{ paddingRight: "0px" }}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={handleCloseProfile}
        >
          <Person className={classes.icons} />
          <p className={classes.linkText} style={{ textTransform: "capitalize" }}> {user.fullName} </p>




        </Button>
        <Button
          onClick={dispatchLogoutAction}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
        >

          <ExitToAppIcon className={classes.icons} />
          <p className={classes.linkText} style={{ textTransform: "capitalize" }}> Logout</p>


        </Button>


      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks);