import React from 'react'
import { Link } from 'react-router-dom'

function DriversInfo() {
  return (
    <div style={{marginTop:"150px"}}>
        <center>
        <div className="row container w-75">
            <div className="col-12 col-md-6">
                <img className='rounded shadow' src="https://erlinks.com/en/wp-content/uploads/2022/12/2c9dcf37e47a6e0cb5f1cadb2dc725fe.jpg" alt=""  style={{width:"100%"}}/>
            </div>
            <div className="col-12 col-md-6 mt-3">
                    <h3>One Way</h3>
                    <p>
                    Shunning public transport that can be crowded, complicated, and obviously not adhere to your schedules. When you book driver online a car is already waiting for you right at your location ready to drive you at your destination. Book driver and With in 10 min driver will assign booking and you will received driver details with document. It a rule to provide a high-quality service by hiring only the trained chauffeurs.
                    </p>
                    <Link to={'/login'}>            <button  className='btn btn-dark'>Book Now</button>
                    </Link>            </div>

        </div>
        </center>

        



        <center>
        <div className="row container w-75 " style={{marginTop:"140px"}}>
            <div className="col-12 col-md-6">
                <h3>Round Trip</h3>
           <p>
           Would you like to waste your next trip on the roads suffocating on exhaust while striving to convince down an enraged taxi driver? Didn't even imagine so. That's the reason you should reconsider transfer and chauffeur services plan. Indeed, the ideal plan to keep your following travel secured is to book driver online and With in 10 min driver will assign booking and you received driver Details with document , Our Driver are Verify and experience , The It a rule to provide a high-quality service by hiring only the trained chauffeurs.
           </p>

            <Link to={'/login'}>            <button  className='btn btn-dark'>Book Now</button>
            </Link>
            </div>
            <div className="col-12 col-md-6">
                    <img src="https://img.freepik.com/free-photo/man-car-driving_23-2148889981.jpg" alt="" className='rounded shadow ' style={{width:"100%"}}/>
            </div>

        </div>
        </center>





    </div>
  )
}

export default DriversInfo