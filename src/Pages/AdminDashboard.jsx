import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import Table from 'react-bootstrap/Table';
import { getBookingsByUserAPI, getUsersInAdminAPI } from '../services/allAPIs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function AdminDashboard() {
 
  const [users, setUsers] = useState([]);
  const [selectedUserBookings, setSelectedUserBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getUsersInAdmin = async () => {
    try {
      const response = await getUsersInAdminAPI();
      if (response.status === 200) {
        setUsers(response.data);
        
      }
    } catch (err) {
      console.error(err);
    }
  };



  const fetchBookingsByUser = async (userId, username) => {
    try {
      const response = await getBookingsByUserAPI(userId);
      if (response.status == 200) {
        setSelectedUser(username); // Set selected user's name
       setSelectedUserBookings(response.data.bookings); // Handle case where bookings may not exist
        console.log(selectedUserBookings);
        handleShow()
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setSelectedUserBookings([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    getUsersInAdmin();
  }, []);

  return (
    <div className="row" style={{ paddingTop: '0px' }}>
      <div className="col-2">
        <AdminSidebar />
      </div>
      <div className="col w-75 p-5">
        <center>
          <h4 className="m-4">USERS</h4>
        </center>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td style={{width:"200px"}}>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => fetchBookingsByUser(user._id, user.username)}
                    >
                      View Bookings
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>


      <Modal
  show={show}
  onHide={handleClose}
  dialogClassName="custom-modal-width"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Booking History:{selectedUser}</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {selectedUserBookings.length > 0 ? (
      selectedUserBookings.map((booking) => {
        const amount = (booking.packageHours * 200) + 200;

        return (
          <Card
            className="mt-4 mb-4"
            key={booking._id}
            style={{
              opacity: ['Completed', 'Cancelled'].includes(booking.status) ? 0.6 : 1,
            }}
          >
            <Card.Header as="h5">
              {booking.tripMode}, <span style={{ float: "right" }}>{booking.city}</span>
            </Card.Header>
            <Card.Body>
              <Card.Title>Username: {booking.username}</Card.Title>
              <Card.Title>Pickup Location: {booking.pickupLocation}</Card.Title>
              <Card.Title>Destination Location: {booking.destinationLocation}</Card.Title>
              {booking.date && booking.time && (
                <div>
                  {/* <Card.Title>Time: {convertTo12HourFormat(booking.time)}</Card.Title> */}
                  <Card.Title>Date: {booking.date}</Card.Title>
                </div>
              )}
              <Card.Title>Package Hours: {booking.packageHours}</Card.Title>
              <Card.Title>Car Type: {booking.carType}, {booking.carModel}</Card.Title>
              <Card.Title className="fw-bold">Amount: ₹{amount}</Card.Title>

              <center>
                {booking.status === 'Completed' ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>Completed</span>
                ) : booking.status === 'Cancelled' ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>Cancelled</span>
                ) : (
                  <Button variant="primary">On progress</Button>
                )}
              </center>
            </Card.Body>
          </Card>
        );
      })
    ) : (
      <p className="text-center">No bookings exist for this user.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>



    
    </div>
  );
}





export default AdminDashboard;
