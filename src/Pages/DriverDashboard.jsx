import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import SideBar from '../Components/SideBar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { acceptBookingAPI, getAllBookingsInDriverAPI } from '../services/allAPIs';


function DriverDashboard() {

  const [fullname, setFullName] = useState("");

  const [allUserBookings, setAllUserBookings] = useState([])

  const [driverCity, setDriverCity] = useState(""); // Store the driver's city






//Viewing All Bookings
const getAllBookingsInDriver = async () => {
  try {
    const response = await getAllBookingsInDriverAPI();
    console.log(response);

    // Filter out bookings with status "Accepted" or "Completed"
    const filteredBookings = response.data.filter(
      (booking) => booking.status !== "Accepted" && booking.status !== "Completed" && booking.status !== "Cancelled" 
    );

    // Update state with filtered bookings
    setAllUserBookings(filteredBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};


console.log(allUserBookings);







  // Function to handle accepting a booking
  const handleAcceptBooking = async (bookingId) => {
    const reqBody = {
      driverId: sessionStorage.getItem("driverId"), // Assuming driverId is stored in session
      driverName: fullname,
      driverPhone: sessionStorage.getItem("driverPhone"),
    };

    try {
      const response = await acceptBookingAPI(bookingId, reqBody);
      if (response.status == 200) {
        alert('Booking accepted successfully!');

      

        getAllBookingsInDriver(); // Refresh the bookings list
      } else {
        alert('Failed to accept the booking. Please try again.');
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
      alert('Failed to accept the booking. Please try again.');
    }
  };







  // Utility function to convert 24-hour time to 12-hour format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const hourInt = parseInt(hours, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const adjustedHour = hourInt % 12 || 12; // Convert 0 to 12 for midnight
    return `${adjustedHour}:${minutes} ${period}`;
  };






  useEffect(() => {

    setFullName(sessionStorage.getItem("fullname"));
    setDriverCity(sessionStorage.getItem("driverCity"));
    console.log("Driver City:", sessionStorage.getItem("driverCity")); // Debugging
    getAllBookingsInDriver();
  }, []);



  // Filter bookings by driver's city
  const filteredBookings = allUserBookings.filter(
    (booking) =>
      booking.city &&
      driverCity &&
      booking.city.trim().toLowerCase() === driverCity.trim().toLowerCase()
  );

  // Sort bookings by creation date in descending order
  const sortedBookings = filteredBookings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

      // Convert ISO date-time string to readable date and 12-hour time
      const formatAcceptedAt = (isoString) => {
        if (!isoString) return "";
        const dateObj = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; // e.g., January 1, 2023
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const timePeriod = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes} ${timePeriod}`;
        return `${formattedDate}, ${formattedTime}`;
    };




  return (
    <>
      <Header />
      <div style={{ paddingTop: "82px" }} className="d-flex">


        <SideBar />



        <div className='w-100  '  >
          {/* <h3 className='mt-3 ml-3'>Welcome {fullname}</h3><br /> */}

          <h4 className='ms-4 mt-4 fw-bold'>New Bookings:</h4>


          <div className="col-12 container col-md-6 " >


          {
              sortedBookings.length > 0 ? sortedBookings.map(bookings => {
                // Calculate the amount
                const amount = (bookings.packageHours * 200) + 200;
                const createdAt = formatAcceptedAt(bookings.createdAt);
                return (
                 <div>
                  created at: {createdAt}
                   <Card className='mt-4' key={bookings._id}>
                    <Card.Header as="h5">
                      {bookings.tripMode}  
                      <span style={{ float: "right" }}>City: {bookings.city}</span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>username: {bookings.username}</Card.Title>
                      <Card.Title>userId: {bookings.userId}</Card.Title>
                      <Card.Title>PickUp Location: {bookings.pickupLocation}</Card.Title>
                      <Card.Title>Destination Location: {bookings.destinationLocation}</Card.Title>
                      <Card.Title>Time to Reach: {bookings.driverNeeded} </Card.Title>

                      {bookings.date && bookings.time && (
                        <div>
                          <Card.Title>Time: {convertTo12HourFormat(bookings.time)} </Card.Title>
                          <Card.Title>Date: {bookings.date} </Card.Title>
                        </div>
                      )}

                      <Card.Title>Package Hours: {bookings.packageHours}</Card.Title>
                      <Card.Title>Car Type: {bookings.carType}, {bookings.carModel}</Card.Title>

                      {/* Display Amount */}
                      <Card.Title className='fw-bold'>Amount: ₹{amount}</Card.Title>

                      <center><Button onClick={() => handleAcceptBooking(bookings._id)} variant="success">Accept</Button></center>
                    </Card.Body>
                  </Card>
                 </div>
                );
              }) : "No recent Bookings.."
            }



          </div>


        </div>



      </div>
    </>
  );
}

export default DriverDashboard;
