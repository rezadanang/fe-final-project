import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Col, Row, Form, Nav, Navbar, Offcanvas, InputGroup } from 'react-bootstrap';
import Logo from "../assets/logo.png"  
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import axios from 'axios'
import Moment from 'react-moment';
import Footer from './home/Footer';
import { faBell, faCalendarDay, faInfoCircle, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultProfile from '../assets/avatarr.png'
import Lottie from 'react-lottie';
import animationData from '../lottie/no-data.json';
import {Helmet} from "react-helmet";

function Notifications() {
    const ButtonSignOut = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

const WrapperNotifications = styled.div`
  margin-top: 15px;
  padding: 2em 1em;
  background: #F5F6FA;
  border-radius: 10px;
`;

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


const getEmailUser = localStorage.getItem("emailUser");
const getToken = localStorage.getItem("token");
const idUser = localStorage.getItem("idUser");
const navigate = useNavigate();

const logOut = () => {
    localStorage.clear();
    navigate("/")
}

const [notifications, setNotifications] = useState('');
const [searchTickets, setSearchTickets] = useState('');
const [photoProfile, setPhotoProfile] = useState('');

useEffect(() => {
  axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/notifications", { headers: {"Authorization" : `Bearer ${getToken}`} })
  .then(res => {
    const datas = res.data.data;
    const datasFiltered = datas.filter(data => {
      return data.userId === parseInt(idUser)
    });
    setNotifications(datasFiltered);
  })
  .catch((err) => {
    console.log(err)
  });
}, [getToken, idUser]);


useEffect(() => {
  getProfileById();
}, []);

const getProfileById = async () => {
  try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/${idUser}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
  setPhotoProfile(response.data.data.photoProfile)
}catch (err){
  console.log(err);
}
  
};
if (getToken) {
    return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>E-Flight | Notifications</title>
        </Helmet>
  {['lg'].map((expand) => (
    <Navbar key={expand} expand={expand} className="mb-3">
      <Container fluid>
          <Link to="/"><img src={Logo} width={80} height={80} alt="logo" /></Link>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
             E-flights
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1">
              <Nav.Link><Link to="/allflights" style={{textDecoration:"none"}}>All Flights</Link></Nav.Link>
              <Nav.Link><Link to="/wishlist-order" style={{textDecoration:"none"}}>Wishlist</Link></Nav.Link>
              <Nav.Link><Link to="/notification-order" style={{textDecoration:"none"}}>Notifications</Link></Nav.Link>
              <Nav.Link><Link to="/history-order" style={{textDecoration:"none"}}>Your Orders</Link></Nav.Link>
            </Nav>
            <Nav className="justify-content-center">
              <Nav.Link><Link to={"user/" + idUser} style={{textDecoration:"none"}}><img src={photoProfile ? photoProfile : defaultProfile} style={{width:"25px", height:"25px", borderRadius:"50%"}} className="text-center" alt="profile image"/> {getEmailUser}</Link></Nav.Link>
              <ButtonSignOut onClick={logOut}>LOG OUT</ButtonSignOut> 
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}
    <Container>
    <h2 className='mt-3 text-center'>Notifications <FontAwesomeIcon style={{color:"#4600FF"}} icon={faBell} /></h2>
     
    
    </Container>

    
  
          {   
          notifications.length > 0 ? (
            notifications.filter((value) => {
            if(searchTickets === ""){
        
              return value
            } else if(value.idTicket.toLowerCase().includes(searchTickets.toLowerCase())){
              return value
            } else if(value.origin.toLowerCase().includes(searchTickets.toLowerCase())){
              return value
            } else if(value.destination.toLowerCase().includes(searchTickets.toLowerCase())){
              return value
            }
          }).
          map((item) =>
          <Container>
          <WrapperNotifications>
            <div className='text-center'>
            Dear {getEmailUser}, your book order at <Moment format='DD-MM-YYYY'>{item.createdAt}</Moment> already for boarding.
            </div>
            <div className='text-center'>
            Please stand by before <Moment format='HH:mm'>{item.departure_time}</Moment> on gate. Have a safe and comfortable flight! ????
            </div>
          </WrapperNotifications>
          </Container>
          )) : <><h5 className="text-center mt-5">No Data Available</h5>
          <Lottie options={lottieOptions} height={400} width={400}/>
          </>

          
            
        } 

    <Footer />
        </>
        )
  } 
  else { 
    return (
        <Login />
    )}
}

export default Notifications