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
    <div id="nav">
      <MDBNavbar expand="lg" light style={{ backgroundColor: 'white', margin: '0px', padding: '0px', height: '70px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand className="ms-2" style={{ paddingRight: '380px' }} href="#">
            <img src={logo} style={{ width: '25px', height: '25px' }} alt="" />
            <span className="mt-3">
              <p style={{ fontWeight: '600' }} className="fs-5">
                DRIVE-MATE
              </p>
            </span>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 ">
              <Link to={'/'}>
                <MDBNavbarItem className="me-5 mt-3 " style={{ color: 'black' }}>
                  Home
                </MDBNavbarItem>
              </Link>

              <Link to={'/'}>
                <MDBNavbarItem className="me-5 mt-3 " style={{ color: 'black' }}>
                  Services
                </MDBNavbarItem>
              </Link>

              {username ? (
                <Link to={'/requestDriver'} style={{ color: 'black' }}>
                  <MDBNavbarItem className="me-5 mt-3">Bookings</MDBNavbarItem>
                </Link>
              ) : (
                <Link to={'/about'} style={{ color: 'black' }}>
                  <MDBNavbarItem className="me-5 mt-3">About</MDBNavbarItem>
                </Link>
              )}

              <MDBNavbarItem style={{ marginLeft: '280px' }} className="me-5 ">
                {username ? (
                  <button
                    onClick={handleLogOut}
                    className="btn btn-dark rounded shadow mt-2 fw-bolder"
                    style={{ height: '35px', width: '100px', color:"orange"}}
                  >
                    LOGOUT
                  </button>
                ) : !hasDriverId ? (
                  <Link to={'/rideordrive'}>
                    <button
                      className="btn btn-dark shadow mb-2 mt-2"
                      style={{ height: '35px', width: '100px' }}
                    >
                      LOGIN
                    </button>
                  </Link>
                ) : null}
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
