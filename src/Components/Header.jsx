import React, { useEffect, useState } from 'react';
import './Header.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import logo from './img/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  const [username, setUsername] = useState('');
  const [hasDriverId, setHasDriverId] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/rideordrive');
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
    setHasDriverId(!!sessionStorage.getItem('driverId')); // Check if driverId exists and is not null
  }, []);

  return (
    <div id="nav" >
      <MDBNavbar expand="lg" light style={{ backgroundColor: 'white', padding: '0px', height: '70px' }}>
        <MDBContainer fluid >
          <MDBNavbarBrand className="col-7 ms-2 d-flex align-items-center">
            <img src={logo} className='mt-1' style={{ width: '20px', height: '20px' }} alt="" />
            <span className=" mt-1 fw-bold fs-5">DRIVE-MATE</span>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}  
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic} className='container-fluid' style={{backgroundColor:"white"}}>
            {
              hasDriverId ? (""):
              (
                <MDBNavbarNav className="w-100 d-flex flex-column flex-lg-row justify-content-lg-center align-items-lg-center text-center">
              <Link to={'/'}>
                <MDBNavbarItem className="me-lg-5 mt- text-black">Home</MDBNavbarItem>
              </Link>

              {
                username ? (
                  <Link to={'/userDashboard'}>
                <MDBNavbarItem className="me-lg-3 mt- text-black">Dashboard</MDBNavbarItem>
              </Link>
                ):(
                  <Link to={'/services'}>
                <MDBNavbarItem className="me-lg-5 mt- text-black">Services</MDBNavbarItem>
              </Link>
                )
              }

              {username ? (
                <Link to={'/requestDriver'} className="text-black">
                  <MDBNavbarItem className="me-lg-5 mt-">Bookings</MDBNavbarItem>
                </Link>
              ) : (
                <Link to={'/about'} className="text-black">
                  <MDBNavbarItem className="me-lg-5 mt">About</MDBNavbarItem>
                </Link>
              )}

              <div className="mt-3 mt-lg-0 ms-lg-auto text-center">
                <MDBNavbarItem>
                  {username ? (
                    <button
                      onClick={handleLogOut}
                      className="btn btn-dark rounded shadow fw-bolder"
                      style={{ height: '35px', width: '100px', color: "orange" }}
                    >
                      LOGOUT
                    </button>
                  ) : !hasDriverId ? (
                    <Link to={'/rideordrive'}>
                      <button
                        className="btn btn-dark shadow"
                        style={{ height: '35px', width: '100px' }}
                      >
                        LOGIN
                      </button>
                    </Link>
                  ) : null}
                </MDBNavbarItem>
              </div>
            </MDBNavbarNav>
              )
            }
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
