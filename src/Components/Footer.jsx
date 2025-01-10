import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../Pages/Img/logo.jpg';

function Footer() {
  return (
    <MDBFooter style={{fontFamily:"poppins,serif", backgroundSize:"cover", color:"black"}} className='text-center text-lg-start '>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span> 
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src={logo} alt="" style={{width:"25px"}}/> 
                 DRIVE-MATE
              </h6>
              <p>
              Hire private drivers for your car at your fingertips no matter where you are with our easy -to- use Web Application.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                <a href='#!' className='text-reset'>
                  In Cities
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Outstation
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Monthly
                </a>
              </p>
             
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Location</h6>
              <p>
                <a href='#!' className='text-reset'>
                Cochin
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Trivandrum
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Calicut
                </a>
              </p>
            
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-2'>
              <h6 className='text-uppercase fw-bold mb-3'>Contact</h6>
              <input type="text " placeholder='How can we help you?' className='form-control rounded shadow mb-2' />
              <button className='btn btn-primary rounded shadow mb-3'>Send</button>
           
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                Drive-Mate@gmail.com
              </p>
           
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Drive-Mate.com
        </a>
      </div>
    </MDBFooter>
     
  )
}

export default Footer