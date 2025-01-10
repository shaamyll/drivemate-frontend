import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import UserSideNavbar from '../Components/UserSideNavbar'

function RideOrDrive() {
  return (
    <>
    <Header/>
    <UserSideNavbar/>
    <div style={{paddingTop:"60px", marginBottom:"100px"}}>

        <div className="row mt-5" >


            <div  className="col-12 col-md-4 container shadow p-4"  style={{height:"560px"}} >

              <div id='userRide' className='w-100 shadow  mb-3' style={{ height:"350px" }}>
               

              </div>


                <h4 className='text-dark fw-bold ' >Few clicks away to find an Expieirienced driver for you ride</h4>
                <h4 className='text-dark fw-bold '>Login as..</h4>
                <Link to={'/register'}>
                <button className='btn btn-primary w-25 ' >User</button>
                </Link>

            </div>


            <div className="col-12 col-md-4 container shadow p-4" id='driverss'style={{height:"560px"}} >


            <div id='userDriver' className='w-100 shadow  mb-3' style={{ height:"320px" }}>
               

              </div>


            <h4 className='text-dark fw-bold '>Work flexibly with zero investment. Own Car is not required, easy onboarding and daily payouts!</h4>
            <h4 className='text-dark fw-bold '>Register as..</h4>
            <Link to={'/driverregister'}>
            <button className='btn btn-primary w-25'>Driver</button>
            </Link>

            </div>


        </div>


    </div>
    </>
  )
}

export default RideOrDrive