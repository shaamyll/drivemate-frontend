import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const [fullName,setFullName] = useState("")

  const navigate = useNavigate()

  // State for controlling the sidebar on small screens
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDriverLogout = async()=>{
    sessionStorage.clear()
    navigate('/rideordrive')

  }

  useEffect(()=>{
    setFullName(sessionStorage.getItem("fullname"))
  },[])

  return (
    <div className="row  d-flex "   style={{
      width:"100%",
      backgroundColor: "#141414", // Updated color
      padding: "20px",
      color: "white", 
  
    }}>
    



          <div className="mb-4 " style={{color:"white"}}>
        
            <h5>   {fullName}</h5>
      
          </div>

          <ul style={{ listStyle: "none", padding: "0" }}>
           
           <Link to='/driverDashboard'>
           <li
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                color:"white"
              }}
            >
            
              Dashboard
            </li>
           </Link>

            
              <Link to={'/driverBookings'}>
              <li
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                color:"white"
              }}
            >
          
              Bookings
            </li>

              </Link>


              {/* <Link to={'/driverPayment'}>
              <ListItem
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                color:"black"
              }}
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" style={{ fontSize: "20px" }} />
              </ListItemPrefix>
              Payment
            </ListItem>

              </Link> */}

            
           <li 
           onClick={handleDriverLogout}
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" style={{ fontSize: "20px" }} />
              </ListItemPrefix>
              Log Out
            </li>
         

          </ul>
      

    </div>
  );
};

export default Sidebar;