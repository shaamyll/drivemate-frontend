import React from 'react'
import { Link } from 'react-router-dom'
import d1 from '../Components/img/d1.jpg'
import d2 from '../Components/img/d2.jpg'


function DriversInfo() {
  return (
    <div style={{marginTop:"150px"}}>
        <center>
        <div className="row container w-75">
            <div className="col-12 col-md-6">
                <img className='rounded shadow' src={d1} alt=""  style={{width:"100%"}}/>
            </div>
            <div className="col-12 col-md-6 mt-3">
                    <h3>One Way</h3>
                    <p> Navigating through crowded, complicated, and often unreliable public transportation can turn even the simplest journey into a major hassle. Why put yourself through that when a much more convenient option is just a few clicks away? When you book a driver online, a professional chauffeur is promptly assigned, with a car ready and waiting at your location to take you comfortably and safely to your destination. Within just 10 minutes of booking, you will receive the complete driver details along with verified documents, ensuring full transparency and safety. We are committed to maintaining a strict policy of hiring only trained, experienced, and verified drivers, so that every journey you make with us is smooth, professional, and completely worry-free </p>
                    <Link to={'/login'}>            <button  className='btn btn-dark'>Book Now</button>
                    </Link>            </div>

        </div>
        </center>

        



        <center>
        <div className="row container w-75 " style={{marginTop:"170px"}}>
            <div className="col-12 col-md-6">
                <h3>Round Trip</h3>
                <p> Have you ever imagined wasting your next trip stuck on the roads, suffocating in exhaust fumes, while desperately trying to negotiate with an irate taxi driver? Probably not — and that's exactly why you should seriously reconsider your travel plans and opt for professional transfer and chauffeur services. Booking a reliable driver online ensures a smooth, stress-free travel experience, saving you from the typical hassles of commuting. Within just 10 minutes of your booking, a driver will be assigned to your ride, and you'll immediately receive all the driver’s details along with verified documents for your safety and peace of mind. Our drivers are not only thoroughly verified but also highly experienced professionals. We strictly adhere to a policy of hiring only well-trained </p>

            <Link to={'/login'}>            <button  className='btn btn-dark'>Book Now</button>
            </Link>
            </div>
            <div className="col-12 col-md-6">
                    <img src={d2} alt="" className='rounded shadow ' style={{width:"100%"}}/>
            </div>

        </div>
        </center>





    </div>
  )
}

export default DriversInfo