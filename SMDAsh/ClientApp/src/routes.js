// @material-ui/icons
import ErrorIcon from '@material-ui/icons/Error';
import BackupIcon from '@material-ui/icons/Backup';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AnomalyPage from "views/Anomaly/Anomaly.js";
import SrPage from "views/SR/Sr.js";


const dashboardRoutes = [
  {
    path: "/import-data",
    name: "Import Data",
    icon: BackupIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/anomaly",
    name: "Anomaly",
    icon: ErrorIcon,
    component: AnomalyPage,
    layout: "/admin"
  },
  {
    path: "/sr",
    name: "Service Request",
    icon: ArrowRightIcon,
    component: SrPage,
    layout: "/admin"
  },
  {
    path: "/evolution",
    name: "Evolution",
    icon: TrendingUpIcon,
    component: DashboardPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
