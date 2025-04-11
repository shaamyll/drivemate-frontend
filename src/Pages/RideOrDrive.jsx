import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

function RideOrDrive() {
  return (
    <>
    <Header/>

    <div style={{paddingTop:"60px", marginBottom:"100px"}}>

        <div className="row mt-5" >


            <div  className="col-12 col-md-4 container  shadow p-4 mb-4"  style={{height:"560px", backgroundColor:"#141414", color:"white"}} >

              <div id='userRide' className='w-100 shadow  mb-3' style={{ height:"350px" }}>
               

              </div>


                <h4 className='text-white fw-bold ' >Few clicks away to find an Expieirienced driver for you ride</h4>
                <h4 className='text-success fw-bold '>Login as..</h4>
                <Link to={'/register'}>
                <button className='btn btn-white w-25 ' >User</button>
                </Link>

            </div>


            <div className="col-12 col-md-4 container shadow p-4" id='driverss'style={{height:"560px" ,backgroundColor:"#141414"}} >


            <div id='userDriver' className='w-100 shadow  mb-3' style={{ height:"320px",  }}>
               

              </div>


            <h4 className='text-white fw-bold '>Work flexibly with zero investment. Own Car is not required, easy onboarding and daily payouts!</h4>
            <h4 className='text-success fw-bold '>Register as..</h4>
            <Link to={'/driverregister'}>
            <button className='btn btn-white w-25'>Driver</button>
            </Link>

            </div>


        </div>


    </div>
    </>
  )
}

export default RideOrDrive