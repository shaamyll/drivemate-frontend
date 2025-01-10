import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  loginAPI, registerAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header';

function Auth({ register }) {

  const navigate = useNavigate()

  //usestate fo getting values
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })


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
  
      try {
        

         //API fetching
      const response = await loginAPI(userDetails)
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
            navigate('/userDashboard')
          }, 6000)

          sessionStorage.setItem("username", response.data.currentUser.username)
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("userId",response.data.currentUser._id)
        }


        // else if  (response.data.currentAdmin){
        //   alert("login Successfull as Admin")

        // }


        
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
    <div className="row w-50 w-md-50  container rounded shadow" style={{   display:"flex", justifyContent:"center",   marginBottom:"100px", height:"430px"}}>

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

    <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="email" placeholder='email' className='form-control rounded  mb-4 mt-4' name="" id="" />

    <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='password' className='form-control rounded  mb-4' name="" id="" />


    {
      register ?
        <div>
          <button onClick={handleregister} className='btn btn-primary  mb-3'>SignUp </button>
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