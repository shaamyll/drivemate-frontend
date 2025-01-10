import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { cancelBookingAPI, getUserBookingsAPI } from '../services/allAPIs';

function RequestDriver() {
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  const userId = sessionStorage.getItem('userId');

  // Fetch driver details for the user's bookings
  const fetchDriverDetails = async () => {
    try {
      const response = await getUserBookingsAPI(userId); // Fetch data from API
      // Sort by the acceptedAt field in descending order to get the newest bookings first
      const sortedBookings = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAcceptedBookings(sortedBookings); // Store sorted bookings
      console.log(' Bookings:', sortedBookings); // Debug log
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };



  const cancelBooking = async (bookingId) => {
    try {
      const response = await cancelBookingAPI(bookingId);
      console.log(response); // Debug message
      alert(response.data.message)

      // Remove the cancelled booking from the state
      setAcceptedBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error('Error cancelling booking:', error.message);
      alert('Failed to cancel the booking. Please try again.');
    }
  };



  // Fetch user booking details
  useEffect(() => {
    fetchDriverDetails(userId);
  }, []);

  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        {/* <h5 className="mt-4 ms-4 text-success">
          Your Booking Request has been confirmed, You will be notified once the driver is available..
        </h5> */}
        <h3 className='mt34'>Your Bookings</h3>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 container mt-3">
          {acceptedBookings.length > 0 ? (
            // Map through bookings to render cards
            acceptedBookings.map((booking, index) => (
             <div>
                    Accepted On: {new Date(booking.driverDetails.acceptedAt).toLocaleString()} 
                    
               <Card
                className="rounded shadow mb-4"
                key={index}
                style={{
                  opacity: ['Completed', 'Cancelled'].includes(booking.status) ? 0.6 : 1,

                }}
              >
                <Card.Header as="h5">

                  Driver:{' '}
                  {booking.status === 'Pending' ? (
                    <span className="text-success fw-bold">Requested</span>
                  ) : (
                    booking.driverDetails.driverName
                  )}
                  <span style={{ float: 'right' }}>
              
                  </span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Contact No: {booking.driverDetails.driverPhone}    <span style={{ float: 'right' }}>Trip mode: {booking.tripMode}</span>  </Card.Title>
                  <Card.Title>
                    Pickup Location: {booking.pickupLocation}{' '}
                    <span style={{ float: 'right' }}>City: {booking.city}</span>
                  </Card.Title>
                  {
                    booking.destinationLocation && (
                      <Card.Title>
                        Destination: {booking.destinationLocation}{' '}
                      </Card.Title>
                    )
                  }
                  {
                    booking.date && (
                      <Card.Title>Date: {booking.date}</Card.Title>
                    )
                  }


                  <Card.Title>Time:
                    {
                      booking.time ? (booking.time) : (" Now")
                    }
                  </Card.Title>


                  {booking.status === 'Accepted' && (
                    <Card.Text>
                      Contact the driver for further informations and updates
                    </Card.Text>
                  )}


                  {booking.status === 'Completed' ? (
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                  ) : booking.status === 'Cancelled' ? (
                    <Button variant="danger" disabled>
                      Cancelled
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => cancelBooking(booking._id)} // Call the cancel function
                    >
                      Cancel Booking
                    </Button>
                  )}


                </Card.Body>
              </Card>
             </div>
            ))
          ) : (
            <h5 className="text-center mt-5">No bookings yet.</h5>
          )}
        </div>
      </div>
    </>
  );
}

export default RequestDriver;
