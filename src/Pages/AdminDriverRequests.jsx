import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import { getdriversInAdminAPI, updateDriverStatusAPI } from '../services/allAPIs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function AdminDriverRequests() {
    const [drivers, setDrivers] = useState([]);
    const[updatedDrivers,setUpdatedDrivers] = useState([]);


    const getDriversInAdmin = async () => {
        try {
            const response = await getdriversInAdminAPI();
            if (response.status === 200) {
                // Filter drivers with status 'pending' or 'rejected'
                const filteredDrivers = response.data.filter(driver => driver.status === "pending" || driver.status === "rejected");
                setDrivers(filteredDrivers);
                
                console.log(filteredDrivers);  // Log the filtered drivers for debugging
            }
        } catch (err) {
            console.log(err);
            setError("Failed to load drivers. Please try again later.");
        }
    };
    


    const handleAcceptDriver = async (driverId) => {
        try {
            const response = await updateDriverStatusAPI(driverId, { status: "accepted" });
            if (response.status === 200) {
                // Update the local state to reflect the change directly
                setDrivers(prevDrivers => 
                    prevDrivers.map(driver => 
                        driver._id === driverId ? { ...driver, status: "accepted" } : driver
                    )
                );
    
                console.log("Driver accepted:", driverId);
                alert(response.data.message);
                location.reload()
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            alert("Failed to accept driver. Please try again later.");
        }
    };
    

    

    const handleRejectDriver = async (driverId) => {
        try {
            const response = await updateDriverStatusAPI(driverId, { status: "rejected" });
            if (response.status === 200) {
                // Update the local state to reflect the change
                const updatedDrivers = drivers.map(driver => {
                    if (driver._id === driverId) {
                        return { ...driver, status: "rejected" };
                    }
                    return driver;
                });
                setDrivers(updatedDrivers);
         
            }
        } catch (err) {
            console.log(err);
            setError("Failed to reject driver. Please try again later.");
        }
    };



    

    useEffect(() => {
        getDriversInAdmin();
        console.log(drivers);
        
    }, []);

    return (
        <div className='row'>
           <div className="col-2 ">
           <AdminSidebar />
           </div>
         <div className="col-10 mt-5">
         <center>
                <h4>Driver Requests</h4>
               
                {drivers.length > 0 ? (
                    drivers.map((driver) => (
                        <Card className="rounded shadow mt-4" style={{ width: '50%' }} key={driver._id}>
                            <Card.Header>FullName : {driver.fullname}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Phoneno : {driver.phoneno}</ListGroup.Item>
                                <ListGroup.Item>City : {driver.city}</ListGroup.Item>
                                <ListGroup.Item>Licenseno: {driver.licenseno}</ListGroup.Item>
                                <ListGroup.Item>Password: {driver.password}</ListGroup.Item>
                                <ListGroup.Item>
                                    {
                                        driver.status == "rejected" ? (
                                            <h5 className='text-danger'>Rejected</h5>
                                        ):(
                                            <>
                                            <button className='btn btn-success me-3' onClick={()=>handleAcceptDriver(driver._id)}>Accept</button>
                                            <button className='btn btn-danger'  onClick={()=>handleRejectDriver(driver._id)}>Reject</button>
                                            </>
                                        )
                                    }
                                   
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))
                ) : (
                    <p>No drivers found</p>
                )}
            </center>
         </div>
        </div>
    );
}

export default AdminDriverRequests;
