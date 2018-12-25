// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

// core components/views
import Farm from "../pages/Farm";
import DashboardPage from '../pages/Dashboard';
import Crops from "../pages/Crops";
//import Crop from "../components/Crop/Crop";
import Login from "../pages/Login";
import Crop from '../pages/Crop';

const dashboardRoutes = [
    {
      path: "/dashboard",
      sidebarName: "Dashboard",
      navbarName: "Dashboard",
      icon: Dashboard,
      component: DashboardPage,
    },
    {
      path: "/farm",
      sidebarName: "Mi finca",
      navbarName: "Mi finca",
      icon: Person,
      component: Farm

    },
    {
      path: "/crops",
      sidebarName: "Mis cultivos",
      navbarName: "Mis cultivos",
      icon: LibraryBooks ,
      component: Crops,
    },
    {
      path: "/crop/:id",
      sidebarName: "cultivo",
      navbarName: "cultivo",
      icon: Unarchive,
      component: Crop,
    },
    {
      path: "/login",
      sidebarName: "Login",
      navbarName: "Login",
      icon: Notifications,
      component: Login,
    },
    
    
    { redirect: false, path: "/", to: "/farm", navbarName: "Redirect" }
  ];
  
  export default dashboardRoutes;
  