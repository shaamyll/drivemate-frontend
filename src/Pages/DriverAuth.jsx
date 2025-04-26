import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { driverLoginAPI, driverRegisterAPI } from '../services/allAPIs';
import Header from '../Components/Header';




function DriverAuth({ driverregister }) {

  const navigate = useNavigate()

  //Use state for getting values
  const [driverDetails, setDriverDetails] = useState({
    fullname: "",
    phoneno: "",
    city: "",
    licenseno: "",
    password: ""
  })

  // Event handler to update city while ignoring 'Select'
  const handleCityChange = (event) => {
    const selectedValue = event.target.value;

    // Only update the state if a valid city is selected
    if (selectedValue !== "none") {
      setDriverDetails((prevDetails) => ({
        ...prevDetails,
        city: selectedValue,
      }));
    } else {
      setDriverDetails((prevDetails) => ({
        ...prevDetails,
        city: "",
      }));
    }
  };



  //function Driver Register
  const handleDriverRegister = async () => {
    console.log(driverDetails);

    const { fullname, phoneno, city, licenseno, password } = driverDetails


    if (!fullname || !phoneno || !city || !licenseno || !password) {
      toast.info("Please fill the form", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      //API fetching
      const response = await driverRegisterAPI(driverDetails)
      console.log(response);

      try {
        if (response.status == 200) {
          toast.success(response.data, {
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
            navigate('/driverlogin')
          }, 6000)

        }
        else{
          toast.warn(response.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      catch (err) {
        console.log(err);

      }
    }
  }



  //function Driver Login
  const handleDriverLogin = async () => {
    console.log(driverDetails);

    const { phoneno, password } = driverDetails

    if (!phoneno || !password) {
      toast.info("Please fill the form", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {

      try {
        //Api fetching
        const response = await driverLoginAPI(driverDetails)
        console.log(response);

        if (response.status == 200) {
          toast.success("Login Successfull", {
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
            navigate('/driverdashboard')
          }, 6000)
          
          sessionStorage.setItem("driverCity",response.data.currentDriver.city)
          sessionStorage.setItem("fullname", response.data.currentDriver.fullname)
          sessionStorage.setItem("driverId",response.data.currentDriver._id)
          sessionStorage.setItem("driverPhone",response.data.currentDriver.phoneno)
        }
        
        else {
          toast.warn(response.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      }
      catch (err) {
        console.log(err);

      }

    }

  }


  return (
    <div style={{ height: "750px", border:"1px solid black"}}>
      <Header/>
      <div className="col-12 col-md-4 p-4 container rounded shadow " style={{ height: "auto", marginTop:"120px", backgroundColor:"#141414", color:"white"}}>
        <center>
          <h3 className='mt-3 mb-3'> DRIVER {
            driverregister ? "REGISTER" : "LOGIN"
          }
          </h3>
          {
            driverregister &&
            <input onChange={e => setDriverDetails({ ...driverDetails, fullname: e.target.value })} type="text " className='form-control rounded shadow  w-75 mt-4 mb-3' placeholder='Full Name "as in license"' name="" id="" />
          }

          <input onChange={e => setDriverDetails({ ...driverDetails, phoneno: e.target.value })} type="text" placeholder='phoneno' className='form-control rounded shadow w-75 mb-3' name="" id="" />






          {
            driverregister &&
            <label htmlFor="" style={{ marginRight: "270px" }}>Select City</label>
          }

          {
            driverregister &&
            <Form.Select aria-label="Default select example" className='form-control rounded shadow w-75 mb-3'
              onChange={handleCityChange}
              value={driverDetails.city}
            >
              <option value="none">Select</option>
              <option value="Cochin">Cochin</option>
              <option value="Calicut">Calicut</option>
              <option value="Trivandrum">Trivandrum</option>

            </Form.Select>
          }


          {
            driverregister && <input onChange={e => setDriverDetails({ ...driverDetails, licenseno: e.target.value })} type="text " className='form-control rounded shadow w-75 mb-3' placeholder='License no.' name="" id="" />
          }





          {/* <textarea name="" className='form-control w-75' placeholder='Address ' id=""></textarea><br /> */}

          <input onChange={e => setDriverDetails({ ...driverDetails, password: e.target.value })} type="text " className='form-control rounded shadow w-75' placeholder='Password' name="" id="" /><br />

          {
            driverregister ?
              <button onClick={handleDriverRegister} className=' btn-primary mb-5'>Register </button>
              :
              <button onClick={handleDriverLogin} className='btn btn-primary mb-5'> Login </button>
          }
                                

          {
            driverregister ?
              <div>
                <p>Already have an Account?  <Link to={'/driverlogin'}>Login</Link></p>
              </div>
              :
              <div>
                <p>Dont have an account?<Link to={'/driverregister'}>Register</Link></p>
              </div>
          }

        </center>

      </div>
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
  )
}

export default DriverAuth