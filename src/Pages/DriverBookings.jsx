import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/SideBar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { completeBookingAPI, getCurrentBookingsByDriverAPI, createRazorpayOrder, verifyPayment } from '../services/allAPIs';
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function DriverBookings() {




    const [payments, setPayments] = useState(0);
    const [currentBookings, setCurrentBookings] = useState([]);


    // Fetching the current accepted and completed bookings of drivers
    const fetchCurrentBookings = async () => {
        const driverId = sessionStorage.getItem("driverId");
        try {
            const response = await getCurrentBookingsByDriverAPI(driverId);

            // console.log("Response Data:", response.data);

            const filteredBookings = response.data.filter((booking) =>
                ['Accepted', 'Completed', 'Cancelled'].includes(booking.status)
            );

            setCurrentBookings(filteredBookings);
            // console.log("Filtered Bookings:", filteredBookings);

            // Calculate 30% of all completed bookings' amount
            const completedBookings = filteredBookings.filter(booking => booking.status === "Completed");
            const totalAmount = completedBookings.reduce((sum, booking) => {
                const amount = (booking.packageHours * 200) + 200;
                return sum + amount;
            }, 0);

            setPayments(totalAmount * 0.3); // Store 30% of the total amount in the payments state
        } catch (error) {
            console.error("Error fetching current bookings:", error);
        }
    };





    // Handle complete
    const handleCompleteBooking = async (bookingId) => {
        try {
            const response = await completeBookingAPI(bookingId); // API call to mark the booking as completed
            // Update the local state to set the booking status as completed
            setCurrentBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status: 'Completed' } : booking
                )
            );

            Swal.fire({
                title: response.data.message,
                icon: "success",
                draggable: true
            });
            // console.log(currentBookings);
            setTimeout(() => {
                location.reload()
            }, 2000)

        } catch (error) {
            console.error('Error completing booking:', error);
        }
    };





    const convertTo12HourFormat = (time) => {
        if (!time) return ""; // Handle undefined or null time
        const [hours, minutes] = time.split(':');
        const hourInt = parseInt(hours, 10);
        const period = hourInt >= 12 ? 'PM' : 'AM';
        const adjustedHour = hourInt % 12 || 12; // Convert 0 to 12 for midnight
        return `${adjustedHour}:${minutes} ${period}`;
    };


    // Sort bookings by creation date in descending order
    const sortedBookings = currentBookings.sort(
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


    useEffect(() => {
        fetchCurrentBookings();
    }, []);




    const paymentHandler = async (e) => {
        e.preventDefault();

        const amount = payments ;
        const currency = "INR";

        let response; // Declare it outside so it's available later

        try {
            const reqBody = {
                amount,
            };

            response = await createRazorpayOrder(reqBody); // now response is available outside too
            console.log("Razorpay order created:", response);
        } catch (err) {
            console.log("Error creating order:", err);
            alert("Failed to create Razorpay order");
            return; // Stop if there's an error
        }

        const options = {
            key: "rzp_test_V8DALqHir1uV3Y",
            amount: payments*100,
            currency: response.data.currency,
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: response.data.id,
            handler: async function (response) {
                const reqbody = {
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                    amount: payments,
                    currency: "INR"
                };

                const res = await verifyPayment(reqbody)

                
                console.log(res);
                if (res.status === 200) {
                    setPayments(0);
                    toast.success('Payment Successful!');
                } else {
                    toast.error('Payment verification failed');
                }
            },
            prefill: {
                name: "Drive Mate",
                email: "Drivemate@example.com",
                contact: "9000000000",
            },
            notes: {
                address: "Drive-mate Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },

            
        };if (typeof window.Razorpay !== "function") {
            alert("Razorpay SDK not yet loaded. Please try again.");
            return;
        }

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();

     
    };






    return (
        <>
            <Header />
            <div className='row' style={{ paddingTop: "60px", backgroundColor: "#141414", color: "white" }}>
                <div className="col-4 col-md-2">
                    <Sidebar />

                </div >

                <div className="col-8 col-md-6" >
                    <center>
                        <h3 className='mt-4'>Bookings</h3>
                        <div className='  mt-4'>



                            {
                                sortedBookings.map((booking) => {

                                    const amount = (booking.packageHours * 200) + 200;
                                    const acceptedAtFormatted = formatAcceptedAt(booking.driverDetails.acceptedAt);

                                    return (
                                        <div style={{ color: "white" }}>
                                            Accepted At:  {acceptedAtFormatted}
                                            <Card className='mt-4 mb-4' key={booking._id}
                                                style={{
                                                    color: "black",
                                                    opacity: ['Completed', 'Cancelled'].includes(booking.status) ? 0.6 : 1,
                                                    // pointerEvents: booking.status === 'Completed' ? 'none' : 'auto',
                                                }}>
                                                <Card.Header as="h5">  {booking.tripMode}, <span >{acceptedAtFormatted}</span>  <span style={{ float: "right" }}>{booking.city}</span> </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>Username: {booking.username}</Card.Title>
                                                    <Card.Title>Phoneno: {booking.email}</Card.Title>
                                                    <Card.Title>Pickup Location: {booking.pickupLocation}</Card.Title>
                                                    <div className='col-2 '>
                                                        <img src="https://img.freepik.com/premium-vector/route-vector-icon-route-destination-with-map-pin-doted-line-vector-illustration-eps-10_532800-355.jpg" alt="" style={{ width: "100%" }} />
                                                    </div>
                                                    <Card.Title>Destination Location: {booking.destinationLocation}</Card.Title>
                                                    {booking.date && booking.time && (
                                                        <div>
                                                            <Card.Title>Time: {convertTo12HourFormat(booking.time)}</Card.Title>
                                                            <Card.Title>Date: {booking.date}</Card.Title>
                                                        </div>
                                                    )}
                                                    <Card.Title>Package Hours: {booking.packageHours}</Card.Title>
                                                    <Card.Title>Car Type: {booking.carType}, {booking.carModel}</Card.Title>
                                                    <Card.Title className='fw-bold'>Amount: ₹{amount}</Card.Title>

                                                    <center>
                                                        {booking.status === 'Completed' ? (
                                                            <span style={{ color: "green", fontWeight: "bold" }}>Completed</span>
                                                        ) : booking.status === 'Cancelled' ? (
                                                            <span style={{ color: "red", fontWeight: "bold" }}>Cancelled</span>
                                                        ) : (
                                                            <Button variant="primary" onClick={() => handleCompleteBooking(booking._id)}>
                                                                Complete
                                                            </Button>
                                                        )}
                                                    </center>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })}



                        </div>
                    </center>
                </div>

                <div className="col-8 col-md-3 container rounded shadow p-4 mt-5 mb-5" style={{ height: "250px", backgroundColor: "white", color: "black" }}>
                    <center>
                        <h4 className='fw-bold'>payments</h4>

                        <h5 className='mt-5 fw-bold'>pending: ₹{payments}</h5>
                        <br />
                        <button className='btn btn-dark' onClick={paymentHandler} >Pay</button>
                    </center>
                    <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                </div>
             
            </div>
        </>
    )
}

export default DriverBookings