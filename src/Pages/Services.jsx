import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

function Services() {
    return (
        <div>
            <Header />


            <div className="container " style={{ paddingTop: "80px", paddingBottom: "80px" }}>
                <center>
                    <h4 className='mt-4 fw-bold'>Driver Charges for Trip Basis</h4>
                </center><br />
                <p className='fs-5 fw-bold'>Local Charges for 2 hours(Service will be available for 24hours)</p><br />
                <div className="col-8 container">
                    <table class="table" style={{border:"2px solid black"}}>
                        <thead>
                            <tr className='table-warning'>
                                <th scope="col">Hours</th>
                                <th scope="col">Rates</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">2 Hours(minimum)</th>
                                <td>Rs. 400/-</td>

                            </tr>
                            <tr>
                                <th scope="row">Per hour overtime</th>
                                <td>Rs. 200/-</td>

                            </tr>
                            <tr>
                                <th scope="row">After 11 pm for night allowance up-to 6 AM.</th>
                                <td>Rs. 200/-</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

               <center> <Link to={'/rideordrive'}><button  className='btn btn-dark mt-5'>Book Driver</button></Link><br /><br /><br />

               <h4 className='fw-bold'>Benefits of Hiring Temporary Drivers from Driver on Hire</h4>
               <br />
               <p>Are you in need of temporary drivers to fulfill short-term driving requirements for your business or personal needs? Look no further than Driver on Hire, a trusted temporary driver agency that provides reliable and skilled drivers for diverse objectives. Here are the key benefits of opting for our temporary driver services:</p>
               </center><br />

         <div className="col-4">
         <h4 style={{textDecoration:"underline", fontWeight:"bold"}}>How it works</h4>
             
               <p>Our Driver Service App transforms the way you access transportation. Whether you need an immediate ride or want to plan ahead, our app connects you with experienced drivers who have over 5 years of driving experience. Enjoy safe, reliable, and comfortable journeys tailored to your needs.</p>
         </div>
            </div>
        </div>
    )
}

export default Services