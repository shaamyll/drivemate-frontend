import React from 'react'
import { Link } from 'react-router-dom'

function DriversInfo() {
  return (
    <div style={{marginTop:"150px"}}>
        <center>
        <div className="row container w-75">
            <div className="col-6">
                <img className='rounded shadow' src="https://erlinks.com/en/wp-content/uploads/2022/12/2c9dcf37e47a6e0cb5f1cadb2dc725fe.jpg" alt=""  style={{width:"500px"}}/>
            </div>
            <div className="col-6 mt-3">
                    <h3>One Way</h3>
                    <p>
                    Shunning public transport that can be crowded, complicated, and obviously not adhere to your schedules. When you book driver online a car is already waiting for you right at your location ready to drive you at your destination. Book driver and With in 10 min driver will assign booking and you will received driver details with document. It a rule to provide a high-quality service by hiring only the trained chauffeurs.
                    </p>
                    <Link to={'/login'}>            <button  className='btn btn-primary'>Book Now</button>
                    </Link>            </div>

        </div>
        </center>

        



        <center>
        <div className="row container w-75 " style={{marginTop:"140px"}}>
            <div className="col-6">
                <h3>Round Trip</h3>
           <p>
           Would you like to waste your next trip on the roads suffocating on exhaust while striving to convince down an enraged taxi driver? Didn't even imagine so. That's the reason you should reconsider transfer and chauffeur services plan. Indeed, the ideal plan to keep your following travel secured is to book driver online and With in 10 min driver will assign booking and you received driver Details with document , Our Driver are Verify and experience , The It a rule to provide a high-quality service by hiring only the trained chauffeurs.
           </p>

            <Link to={'/login'}>            <button  className='btn btn-primary'>Book Now</button>
            </Link>
            </div>
            <div className="col-6">
                    <img src="https://wset.com/resources/media2/16x9/full/1015/center/80/f342817d-629c-4e77-9387-3541acd412bb-large16x9_holidaytraffic.jpg" alt="" className='rounded shadow' style={{width:"500px", height:"330px"}}/>
            </div>

        </div>
        </center>




        {/* <center>
        <div className="row container w-75 mt-5">
            <div className="col-6">
                <img src="https://actingdriverscoimbatore.com/ui/images/whydriver-min.png" alt=""  style={{width:"500px"}}/>
            </div>
            <div className="col-6">
                    <h3>Monthly Drivers</h3>
                    <p>
                    If you requirement of chauffer Driver for your personal or Business use , You can Book and as per as your requirement We will share driver CV and you will select Very Easy Way to find out , The driver required in Delhi service providers always make it a rule to provide a high-quality service by hiring only the trained chauffeurs. Hiring a licensed driver from get your driver who understands and knows local traffic is an endowment that will support you in making your trip hassle-free
                    </p>
                    <Link to={'/login'}>            <button  className='btn btn-outline-primary'>Book Now</button>
                    </Link>            </div>

        </div>
        </center> */}





    </div>
  )
}

export default DriversInfo