// @material-ui/icons
import ErrorIcon from '@material-ui/icons/Error';
import BackupIcon from '@material-ui/icons/Backup';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AnomalyPage from "views/Anomaly/Anomaly.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/import-data",
    name: "Import Data",
    rtlName: "لوحة القيادة",
    icon: BackupIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/anomaly",
    name: "Anomaly",
    rtlName: "لوحة القيادة",
    icon: ErrorIcon,
    component: AnomalyPage,
    layout: "/admin"
  },
  {
    path: "/sr",
    name: "SR",
    rtlName: "لوحة القيادة",
    icon: ArrowRightIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/evolution",
    name: "Evolution",
    rtlName: "لوحة القيادة",
    icon: TrendingUpIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  /*
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
  */
];

export default dashboardRoutes;
