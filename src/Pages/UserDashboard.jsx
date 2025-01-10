import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import { addUserBookingAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [bookingDetails, setBookingDetails] = useState({
    tripMode: "One way",
    pickupLocation: "",
    destinationLocation: "",
    city: "Cochin",
    driverNeeded: "Now",
    date: "",
    time: "",
    packageHours: "2", // Default package hours
    carType: "Manual", // Default car type
    carModel: "Hatch-back", // Default car model
    userId: ""
  });

  const navigate = useNavigate()

  const [username, setUSername] = useState("");
  const [amount, setAmount] = useState(400); // Base amount
  const [active, setActive] = useState("One way");
  const [driverNeeded, setDriverNeeded] = useState("Now");




  // Handle booking function
  const handleUserBooking = async () => {
    console.log(bookingDetails);

    const { tripMode, pickupLocation, destinationLocation, city, driverNeeded, date, time, packageHours, carType, carModel } = bookingDetails

    if (!pickupLocation || !tripMode || !city || (driverNeeded === "Schedule for Later" && (!date || !time))) {
      alert("Please fill all required fields");
      return;
    }
    else {
      //API call
      const reqBody = new FormData()
      reqBody.append("tripMode", tripMode)
      reqBody.append("pickupLocation", pickupLocation)
      reqBody.append("destinationLocation", destinationLocation)
      reqBody.append("city", city)
      reqBody.append("driverNeeded", driverNeeded)
      reqBody.append("date", date)
      reqBody.append("time", time)
      reqBody.append("packageHours", packageHours)
      reqBody.append("carType", carType)
      reqBody.append("carModel", carModel)

      const username = sessionStorage.getItem("username")
      console.log(username);
      reqBody.append("username", username); // Add username to request body
      
      const token = sessionStorage.getItem("token")
      console.log(token);

      // Set headers for JSON
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      try {

        const response = await addUserBookingAPI(reqBody, reqHeader)
        console.log(response);

        if (response.status === 200) {

          toast.success("Booking Requested", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });

                    setTimeout(() => {
                      navigate('/requestDriver')
                    }, 6000)
          
        }
        else {
          alert(response.response.data)
        }


      }
      catch (err) {
        console.log(err);

      }


    }


  };




  const handleSelect = (option) => {
    setActive(option); // Update UI state for visual feedback
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      tripMode: option, // Update tripMode in bookingDetails state
    }));
  };

  const handleDriverNeededChange = (event) => {
    const value = event.target.value;
    setDriverNeeded(value);
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      driverNeeded: value
    }));
  };

  const handlePackageChange = (event) => {
    const selectedHours = parseInt(event.target.value, 10); // Parse selected hours
    const baseAmount = 400; // Base amount for 2 hours
    const incrementPer2Hours = 200; // Increment for every 2 hours
    const newAmount = baseAmount + (selectedHours - 2) / 2 * incrementPer2Hours;
    setAmount(newAmount); // Update the amount

    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      packageHours: event.target.value
    }));
  };

  const handleChange = (field, value) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value
    }));
  };

  useEffect(() => {
    setUSername(sessionStorage.getItem("username"));
    
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "100px",
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/048/162/293/small/red-pin-on-a-city-map-photo.jpg')",
          backgroundSize: "cover"
        }}
      >
        <h2 className="ms-5 mt-4">Welcome {username}</h2>
        <center>
          <h3 className="mb-3 mt-5">Book Driver Online</h3>
        </center>

        <center>
          <div
            className="rounded shadow ms-lg-4 ms-md-3 p-4"
            style={{ width: "500px", backgroundColor: "white" }}
          >
            <div className="col-12 col-md-12 selector-container">


              <div
                className={`selector ${active === "One way" ? "active" : ""}`}
                onClick={() => handleSelect("One way")}
              >
                One way
              </div>
              <div
                className={`selector ${active === "Round Trip" ? "active" : ""}`}
                onClick={() => handleSelect("Round Trip")}
              >
                Round Trip
              </div>





            </div>

            <div className="col-12 col-md-12">
              <label htmlFor="" className="mt-4" style={{ float: "left" }}>
                Choose Location?
              </label>
              <input
                className="form-control rounded shadow mt-5"
                type="text"
                placeholder="Enter Pickup Location"
                value={bookingDetails.pickupLocation}
                onChange={(e) => handleChange("pickupLocation", e.target.value)}
              />

              {active === "One way" && (
                <input
                  className="form-control rounded shadow mt-2"
                  type="text"
                  placeholder="Enter Destination Location"
                  value={bookingDetails.destinationLocation}
                  onChange={(e) =>
                    handleChange("destinationLocation", e.target.value)
                  }
                />
              )}

              <label
                htmlFor=""
                className="mt-3"
                style={{ marginRight: "380px" }}
              >
                City?
              </label>
              <Form.Select
                aria-label="Default select example"
                className="w-100"
                value={bookingDetails.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <option value="Cochin">Cochin</option>
                <option value="Calicut">Calicut</option>
                <option value="Trivandrum">Trivandrum</option>
              </Form.Select>

              <label htmlFor="" className="mt-2" style={{ float: "left" }}>
                When is driver needed?
              </label>
              <Form.Select
                aria-label="Default select example"
                className="mt-2"
                value={driverNeeded}
                onChange={handleDriverNeededChange}
              >
                <option value="Now">Now</option>
                <option value="Schedule for Later">Schedule for Later</option>
              </Form.Select>

              {driverNeeded === "Schedule for Later" && (
                <div className="mt-2">
                  <label htmlFor="date" style={{ float: "left" }}>
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-control rounded shadow mt-2"
                    placeholder="Select Date"
                    value={bookingDetails.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                  <label
                    htmlFor="time"
                    className="mt-2"
                    style={{ float: "left" }}
                  >
                    Select Time:
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="form-control rounded shadow mt-2"
                    placeholder="Select Time"
                    value={bookingDetails.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                  />
                </div>
              )}

              <label htmlFor="time" className="mt-2" style={{ float: "left" }}>
                Select Package Hours
              </label>
              <Form.Select
                aria-label="Default select example"
                className="mt-2"
                value={bookingDetails.packageHours}
                onChange={handlePackageChange}
              >
                <option value="2">2 Hours</option>
                <option value="4">4 Hours</option>
                <option value="6">6 Hours</option>
                <option value="8">8 Hours</option>
                <option value="10">10 Hours</option>
                <option value="12">12 Hours</option>
              </Form.Select>

              <label
                htmlFor=""
                className="mt-2"
                style={{ marginRight: "350px" }}
              >
                Car Type?
              </label>
              <br />
              <div className="d-flex align-items-center">
                <Form.Select
                  aria-label="Default select example"
                  className="mt-2 w-50"
                  value={bookingDetails.carType}
                  onChange={(e) => handleChange("carType", e.target.value)}
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  className="mt-2 w-50"
                  value={bookingDetails.carModel}
                  onChange={(e) => handleChange("carModel", e.target.value)}
                >
                  <option value="Hatch-back">Hatch-back</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                </Form.Select>
              </div>

              <h2 className="mt-4 fw-bold">
                <FaIndianRupeeSign className="fs-3" />
                {amount}
              </h2>

              <center>
                <button
                  type='button'
                  onClick={handleUserBooking}
                  className="btn btn-success w-50 mt-3 mb-3"
                >
                  Request Driver
                </button>
              </center>
            </div>
          </div>
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
    </>
  );
}

export default UserDashboard;
