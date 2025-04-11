import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // State for controlling the sidebar on small screens
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex" style={{minHeight:"100vh", height:"100%"}}>
     

     <Card
          className="shadow-xl"
          style={{
            width: "250px", 
            backgroundColor: "#343a40", 
            padding: "20px",
            color: "black", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  
          }}
        >
          <div className="mb-2">
            <Typography variant="h5" color="blue-gray" style={{ fontSize: "22px", marginBottom: "20px" }}>
              Admin Dashboard
            </Typography>
          </div>

          <List style={{ listStyle: "none", padding: "0" }}>
           
           <Link to='/admindashboard'>
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
              Users
            </ListItem>
           </Link>

       <Link to={'/adminDrivers'}>
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
              Drivers
            </ListItem>
       </Link>

       <Link to='/AdminDriverReuests'>
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
              Driver requests
            </ListItem>
           </Link>


 

            
              <Link to={'/'}>
              <ListItem
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                color:"black "
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" style={{ fontSize: "20px" }} />
              </ListItemPrefix>
              Log Out
            </ListItem>
              </Link>

           
          </List>
        </Card>

    </div>
  );
};

export default Sidebar;
