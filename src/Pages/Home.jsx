import React, { useEffect, useState } from 'react';
import './Home.css';
import logo from '../Pages/Img/logo.jpg';
import About from '../Components/About';
import DriversInfo from '../Components/DriversInfo';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function LandingPage() {
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
    }, []);

    return (
        <div>
            <Header />

         <div >
               {/* Hero Section */}
               <div className="container-fluid  " style={{paddingTop:"100px"}}>
                <div className="row align-items-center text-center text-md-start">
                   

                    <div className="col-12 col-md-6 mt-5 d-none d-md-block animate__animated animate__bounceInLeft  " id='car' >
                        <img src="https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png" 
                            alt="Car illustration" 
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-12 col-md-6 pt-5">
                        <h4 className='text-success fs-5 fw-bold'>SIMPLIFY CAR OWNERSHIP</h4>
                        <h4 className="fw-bold">
                            <img src={logo} alt="logo" className="me-2" style={{ width: "27px" }} />
                            DRIVE-MATE
                        </h4>
                        <h2 className="fw-bold">Few clicks away to find an <br />
                            <span className='fs-3 fw-bold' style={{color:"orange"}}>EXPERIENCED DRIVER</span> for your ride..
                        </h2>
                        <br />
                        {
                            token ?
                                <Link to={'/login'}><button className="btn btn-dark shadow fw-bold">View dashboard</button></Link>
                                :
                                <Link to={'/login'}><button className="btn btn-dark shadow fw-bold">Get started</button></Link>
                        }
                    </div>



                    {/* <div className="col-12 col-md-6 mt-4 mt-md-0">
                        <img src="https://images.ctfassets.net/q8mvene1wzq4/UGHQ4PWWLuCwDjPwN5i11/c7df3b190c13bd23d32a0da5202c9314/venting_2window-o.gif?w=1500&q=80&fm=" 
                            alt="Driver animation" 
                            className="img-fluid"
                        />
                    </div> */}
                </div>
            </div>

            {/* Booking Section */}
            <div id="about" className="container my-5">
                <div className="row justify-content-center text-center  py-5">
                    <div className="col-12">
                        <h2>BOOK | TRACK | <span className='text-success'>GO</span></h2>
                        <h4 className="mt-4">Got a car, but need a reliable driver too?</h4>
                        <h3 className="mt-3" style={{color:"darkorange"}}>GetYourDriver?</h3>
                        <h5 className="mt-3">Hire private drivers for your car at your fingertips no matter where you are with our easy-to-use Web Application.</h5>
                    </div>
                </div>

                <div className="row justify-content-center mt-4">
                  

                </div>
            </div>

            {/* Other Components */}
            <DriversInfo />
            <About />
         </div>
        </div>
    );
}

export default LandingPage;
