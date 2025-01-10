import React, { useEffect, useState } from 'react'
import './Home.css'
import logo from '../Pages/Img/logo.jpg'
import About from '../Components/About'
import DriversInfo from '../Components/DriversInfo'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

function LandingPage() {

    const [token,setToken] = useState()


    useEffect(()=>{
        setToken(sessionStorage.getItem("token"))
    },[])
    return (
       <>
       <Header/>
       
       <div className='row ' style={{paddingTop:"70px", paddingBottom:"50px"}}>


                    <div id='name' className='col ms-lg-5' style={{ paddingTop: "250px" , paddingLeft:"150px" }}>
                        <h4 style={{ fontWeight: "bolder" }}>  <img style={{ width: "27px" }} src={logo} alt="" />   DRIVE-MATE</h4>
                        <h2 style={{ fontWeight: "bolder" }}>Few clicks away to find an <br />
                            <span style={{ fontWeight: "bolder", color: "black" }}>EXPERIENCED DRIVER</span> for your ride..</h2><br />
                            {
                                token ? 
                                <Link to={'/login'}><button className='btn btn-outline-primary shadow fw-bold '>View dashboard..</button></Link>

                                :
                                <Link to={'/login'}><button className='btn btn-outline-primary shadow fw-bold '>Get started..</button></Link>

                            }
                    </div>

                <div  className="col-12 col-md-6 pe-5" style={{marginTop:"100px"}} >

                    <img style={{width:"600px"}} src="https://images.ctfassets.net/q8mvene1wzq4/UGHQ4PWWLuCwDjPwN5i11/c7df3b190c13bd23d32a0da5202c9314/venting_2window-o.gif?w=1500&q=80&fm=" alt="" />


                </div>

            </div>

       
       





            <div id='about'>

<div  className="row pt-5" style={{height:"330px"}}>
    <center>
        <h2 className='mt-5'>BOOK | TRACK | GO</h2>
        <h4 className='mt-5'>Got a car, but need a reliable driver too</h4>
        <h3 className='mt-4'>GetYourDriver?</h3>
        <br />
        <h5>Hire private drivers for your car at your fingertips no matter where you are with our easy -to- use Web Application.</h5>
    </center>

</div>

<div  className="col-12 col-md-8 " id='car' style={{  marginLeft:"-550px"}}>
    <img src="https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png" alt="" style={{width:"800px"}}/>
</div>





</div>


<DriversInfo/>




<About/>







       </>
    )
}

export default LandingPage