import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  loginAPI, registerAPI, sendOtp, verifyOtp } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header';
import Swal from 'sweetalert2'

function Auth({ register }) {

  const navigate = useNavigate()

  //usestate fo getting values
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [otp,setOtp] = useState("")
  const [verified,setVerified] = useState(false)

   // State for validation messages
   const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  // Function to validate phone number and password
  const validateInputs = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (userDetails.email.length<10) {
      newErrors.email = "must contain 10 digits";
      valid = false;
    }

    if (userDetails.password.length < 8) {
      newErrors.password = "must contain 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const sendO = async()=>{
    const {email} = userDetails
    console.log(email);
   try{
    const response = await sendOtp({phoneno:email})
    console.log(response);
    if(response.status == 200){
      toast.success(response.data.message, {
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
   }  catch(err){
    console.log(err);
    
   }
  }


  const verifyO = async()=>{
    const OTP = otp
    const {email} = userDetails
   try{
    if(otp.length<4){
      toast.info("Invalid OTP", {
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
    const response = await verifyOtp({phoneno:email,otp:OTP})
    console.log(response);
    setOtp("")
    if(response.status==200){
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); 
      setOtp("")
      setVerified(true)
    } else{
      toast.info(response.data.message, {
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
   } catch(err){
    console.log(err);
    
   }
    
  }

  //function register user
  const handleregister = async () => {
    console.log(userDetails);

    const { username, email, password } = userDetails

    if (!username || !email || !password) {
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
      const response = await registerAPI(userDetails)
      console.log(response);

            // Validate inputs before proceeding
  if (!validateInputs()) {
    return;
  }
  

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
          setVerified(false)
          setTimeout(() => {
            navigate('/login')
          }, 6000)
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

      }

    }


  }



  //Login Logic
  const handleLogin = async () => {
    console.log(userDetails);

    const { email, password } = userDetails

    if (!email || !password) {
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

      // Validate inputs before proceeding
  if (!validateInputs()) {
    return;
  }
  
      try {
        

         //API fetching
      const response = await loginAPI(userDetails)
      console.log(response);


        if (response.status == 200) {
          const role = response.data.existingUser.role

          if(role == "admin"){
            Swal.fire({
              title: "Login Successfull as Admin!",
              icon: "success",
              draggable: true
            });
            navigate('/adminDashboard')
          }
    
          else{
                
          toast.success(response.data.message, {
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
            navigate('/userDashboard')
          }, 6000)

          sessionStorage.setItem("username", response.data.currentUser.username)
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("userId",response.data.currentUser._id)
        }
          }


        
        else {
          toast.warn(response.response.data, {
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
    <>
     <Header/>
    <div  style={{  paddingTop:"200px"}}>

   

    <center>
    <div className="row w-50 w-md-50  container rounded shadow" style={{   display:"flex", justifyContent:"center",   marginBottom:"100px", height:"430px", backgroundColor:"#141414", color:"white"}}>

<div id='userLogin' className="col-10 col-md-5 mt-4  shadow" style={{  height:"380px"}}>
 


</div>



<div className=" col-12  col-md-6  p-5   " >
  <center>
    <h4 style={{ fontWeight: "bold" }}>USER {
      register ? "REGISTER" : "LOGIN"
    }
    </h4>

    {
      register && <input onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='form-control rounded  mb-4 mt-4' name="" id="" />

    
    }
<div className="mb-3 mt-4">
  <input
    onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
    type="number"
    placeholder="Phone No"
    className="form-control rounded"
  />
  <div style={{ minHeight: "20px" }}>
    {errors.email && <small className="text-danger">*{errors.email}</small>}
  </div>
</div>


  {
    register ? 
    <div className="mb-3">
 {
  verified ? 
  <input
  onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
  value={userDetails.password}
  type="password"
  placeholder="Password"
  className="form-control rounded"
/>
:
<input
value={otp}
onChange={e => setOtp(e.target.value)}
type="password"
placeholder="Enter OTP"
className="form-control rounded"
/>
 }
  <div style={{ minHeight: "20px" }}>
    {errors.password && <small className="text-danger">*{errors.password}</small>}
  </div>
</div> 
:
<>
<input
onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
value={userDetails.password}
type="password"
placeholder="Password"
className="form-control rounded"
/>
<div style={{ minHeight: "20px" }} className='mb-4'>
    {errors.password && <small className="text-danger">*{errors.password}</small>}
  </div>
</>
  }



    {
      register ?
        <div>
          {
            verified?<button onClick={handleregister} className='btn btn-primary  mb-3'>sign Up </button> 
            :
            <div>
              <button onClick={sendO} className='btn btn-primary  mb-3 me-4'>send otp </button>
              <button onClick={verifyO} className='btn btn-success  mb-3'>Verify otp </button>

            </div>
          }
          <p>Already have an Account? <Link to={'/login'}>SignIn</Link></p>
        </div>
        :
        <div>
          <button onClick={handleLogin} className='btn btn-primary  mb-3'>SignIn </button>
          <p>Dont have an account? <Link to={'/register'}>SignUp</Link></p>
        </div>
    }





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

    </center>


    </div>
    </>
  )
}

export default Auth
