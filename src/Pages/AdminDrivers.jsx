import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getCurrentBookingsByDriverAPI, getdriversInAdminAPI } from '../services/allAPIs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AdminDrivers() {

    const [drivers,setDrivers] = useState([])
    const [selectedDriverBookings, setSelectedDriverBookings] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const getDriversInAdmin = async () => {
    try {
        const response = await getdriversInAdminAPI();

        if (response.status === 200) {
            // Filter drivers with status 'accepted'
            const acceptedDrivers = response.data.filter(driver => driver.status === "accepted");
            setDrivers(acceptedDrivers);
        }
    } catch (err) {
        console.log(err);
    }
};


        const fetchBookingsByDriver = async (driverId, driverName) => {
          try {
            const response = await getCurrentBookingsByDriverAPI(driverId);
            if (response.status == 200) {
              console.log(response);
              
              setSelectedDriver(driverName);
              setSelectedDriverBookings(response.data  || []);
              console.log(selectedDriverBookings);
              
              handleShow();
            }
          } catch (error) {
            console.error('Error fetching bookings:', error);
            setSelectedDriverBookings([]); // Fallback if no bookings found or error
            handleShow();
          }
        };
    
    
        useEffect(()=>{
          getDriversInAdmin()
        },[])
  return (
  <>
  <div className="row">
  <div className="col-2">
  <AdminSidebar/>
  </div>
  <div className="col-10 p-5">
    <center>
        <h3 >Drivers</h3>
     {
        drivers.length > 0 ?
        drivers.map((drivers,index)=>(
            <Card className='rounded shadow mt-4' style={{ width: '50%' }}>
            <Card.Header>FullName : {drivers.fullname}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Phoneno : {drivers.phoneno}</ListGroup.Item>
              <ListGroup.Item>City : {drivers.city}</ListGroup.Item>
              <ListGroup.Item>Licenseno:{drivers.licenseno}</ListGroup.Item>
              <ListGroup.Item>password:{drivers.password}</ListGroup.Item>
              <ListGroup.Item><button  onClick={() =>
                          fetchBookingsByDriver(drivers._id, drivers.fullname)
                        } className='btn btn-primary'>VIEW BOOKINGS</button></ListGroup.Item>
            </ListGroup>
          </Card>
        ))
        :"No drivers found"
     }
    </center>
  </div>






   {/* Modal */}
   <Modal
  show={show}
  onHide={handleClose}
  dialogClassName="custom-modal-width"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Booking History : {selectedDriver}</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {selectedDriverBookings.length > 0 ? (
      selectedDriverBookings.map((booking, index) => (
        <Card className="mt-3" key={booking._id}>
          <Card.Header>
            Booking #{index + 1}: {booking.tripMode}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Pickup Location:</strong> {booking.pickupLocation}
            </Card.Text>
            <Card.Text>
              <strong>Destination Location:</strong> {booking.destinationLocation}
            </Card.Text>
            <Card.Text>
              <strong>City:</strong> {booking.city}
            </Card.Text>
            <Card.Text>
              <strong>Amount:</strong> {booking.amount}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong>{' '}
              <span
                style={{
                  color:
                    booking.status === 'Completed'
                      ? 'green'
                      : booking.status === 'Cancelled'
                      ? 'red'
                      : 'blue',
                  fontWeight: 'bold',
                }}
              >
                {booking.status}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))
    ) : (
      <p className="text-center">No bookings exist for this driver.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>;





  </div>
    
  </>
  )
}

export default AdminDrivers