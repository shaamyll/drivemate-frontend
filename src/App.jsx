import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from './Components/Footer';
import { Routes ,Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import Home from './Pages/Home'
import UserDashboard from './Pages/UserDashboard';
import AboutPage from './Pages/AboutPage';
import Drivers from './Pages/Drivers';
import DriverAuth from './Pages/DriverAuth';
import RideOrDrive from './Pages/RideOrDrive';
import AdminDashboard from './Pages/AdminDashboard';
import DriverDashboard from './Pages/DriverDashboard';
import DriverBookings from './Pages/DriverBookings';
import AdminDrivers from './Pages/AdminDrivers';
import RequestDriver from './Pages/RequestDriver';
import AdminDriverRequests from './Pages/AdminDriverRequests';
import DriverPayment from './Pages/DriverPayment';

function App() {

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/userdashboard' element={<UserDashboard/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/drivers' element={<Drivers/>}/>
      <Route path='/driverlogin' element={<DriverAuth/>}/> 
      <Route path='/driverregister' element={<DriverAuth driverregister/>} />
      <Route path='/rideordrive' element={<RideOrDrive/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/driverdashboard' element={<DriverDashboard/>}/>
      <Route path='/driverBookings' element={<DriverBookings/>}/>
      <Route path='/adminDrivers' element={<AdminDrivers/>}/>
      <Route path='/requestDriver' element={<RequestDriver/>}/>
      <Route path='/AdminDriverReuests' element={<AdminDriverRequests/>}/>
      <Route path='/driverPayment' element={<DriverPayment/>} />
    </Routes>
    
    <Footer/>
    </>
      
    )
}

export default App
