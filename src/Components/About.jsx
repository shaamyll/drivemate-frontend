import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";


function About() {


    return (
        <>


            <div id='About' className='p-5' style={{ marginTop: "100px",  paddingBottom:"80px"}} >







                <div className="row "  >

                    <center>
                        <h2 style={{ fontWeight: "bolder" }} className=' pb-3'>#1 Driver Service by our Professional Drivers</h2>
                        <p>Welcome to Driver on Hire! With our driver on call service, you can say goodbye to the hassles of driving, parking, and navigating through traffic. If you're looking for a driver for rent near you, we have you covered. Our mission is to provide top-notch chauffeur services that meet all your commuting needs.</p>
                    </center>

                    <center>

                        <div id='professional' className="row container  mt-5 mb-5" style={{ fontWeight: "bolder", textAlign: "justify", justifyContent: "space-around", color:"white"}}>

                            <div className="col-12 col-md-2 p-5 mb-4    rounded shadow  " >
                                <h3 className='fw-bold'>2000+ <br />
                                    Verified Drivers..
                                </h3>
                            </div>
                            <div className="col-12 col-md-2 p-5 mb-4  rounded shadow " >
                                <h3 className='fw-bold'>1 LAC+ <br />
                                    Happy Clients
                                </h3>
                            </div>
                            <div className="col-12 col-md-2 p-5 mb-4  rounded shadow " >
                                <h3 className='fw-bold'>24 hrs <br />
                                    Service
                                </h3>
                            </div>

                        </div>

                    </center>


                </div>




                {/* backgroundImage:"url('https://static.vecteezy.com/system/resources/previews/006/455/025/non_2x/location-marking-with-a-pin-on-a-map-or-navigation-icon-sign-on-yellow-background-transport-and-travel-theme-concept-3d-rendering-free-photo.jpg')", */}

                <div style={{ backgroundSize: "cover", color: "black" }} className="row mt-5 pt-5 p-5 ">
                    <h3>Location We Are Available</h3>
                    <center>
                        <p>We are committed to providing the best possible services in all cities. DRIVE-MATE provides corporate drivers in COCHIN for business travel, airport transfers, long/short term stays, and excursions.</p>
                    </center>


                    <center>

                        <div id='location' className="row container  mt-5 mb-5" style={{ fontWeight: "bolder"}}>

                            <div className="col-12 col-md-4 pt-5 "  style={{color:"#141414"}}>
                                <h3 className='fw-bold'><FaMapLocationDot className='fs-1 mb-3 text-dark' /><br />
                                    COCHIN
                                </h3>
                            </div>
                            <div className="col-12 col-md-4 pt-5">
                                <h3 className='fw-bold'><FaMapLocationDot className='fs-1 mb-3 text-dark' /><br />
                                  
                                </h3>
                                <h3 className='text-center'>  CALICUT</h3>
                            </div>
                            <div className="col-12 col-md-4 pt-5 ">
                                <h3 className='fw-bold '><FaMapLocationDot className='fs-1 mb-3 text-dark' />
                                </h3>
                                <h3 className='fw-bold text-center' >TRIVANDRUM</h3>

                            </div>

                        </div>

                    </center>


                </div>




{/* 
                <div className="row  mt-5 pb-5 p-3 mb-4" style={{ height: "400px", display: "flex", justifyContent: "space-evenly" }}>
                    <h3 className='mb-5'>Our Happy Clients</h3>

                    <div className="col-12 col-md-4  rounded shadow p-4 mb-3 " style={{ height: "250px", backgroundColor:"#141414", color:"white" }}>
                        <p className='fs-4 '><FaUserCircle className='fs-1' />Haseem KV</p>
                        <p>"I use driver on hire for my father. Whenever he chooses to visit someone or for his regular needs I get a driver from here. All the drivers so far have been very polite and have taken care of my father. There are no complaints only compliments. Keep up the good work."</p>
                    </div>
                    <div className="col-12 col-md-4 p-4 rounded shadow " style={{ height: "250px",  backgroundColor:"#141414", color:"white"}}>
                        <p className='fs-4'><FaUserCircle className='fs-1' />Faheem</p>
                        <p>"Very good person comes on time very good nature neat and clean driving is very good if i want to give stars 10 on 10 i will give want like this driver"</p>
                    </div>
                </div> */}




            </div>
        </>
    )
}
export default About