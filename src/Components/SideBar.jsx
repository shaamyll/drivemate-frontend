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
    <div className="d-flex " style={{height:"100vh"}}>
    

     <Card
          className="shadow-xl"
          style={{
            width: "250px",
            backgroundColor: "#343a40",
            padding: "20px",
             // Ensure sidebar takes full height of the viewport
            height:"100%",
            color: "black",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
          }}
  
        >
          <div className="mb-2">
            <Typography variant="h5" color="blue-gray" style={{ fontSize: "22px", marginBottom: "20px", color:"black"}}>
              {fullName}
            </Typography>
          </div>

          <List style={{ listStyle: "none", padding: "0" }}>
           
           <Link to='/driverDashboard'>
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
                <PresentationChartBarIcon className="h-5 w-5" style={{ fontSize: "20px" }} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
           </Link>

            
              <Link to={'/driverBookings'}>
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
              Bookings
            </ListItem>

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

            
           <ListItem 
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
            </ListItem>
         

          </List>
        </Card>

    </div>
  );
};

export default Sidebar;