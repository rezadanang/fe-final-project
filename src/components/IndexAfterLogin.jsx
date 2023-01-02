import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "../assets/logo.png"  
import Benefits from './home/Benefits';
import Footer from './home/Footer';
import Hero from './home/Hero';
import WhyUs from './home/WhyUs';
import axios from 'axios';
import defaultProfile from '../assets/avatarr.png'
import HeroAfterLogin from './home/HeroAfterLogin';

const ButtonAdmin = styled.button`
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

function IndexAfterLogin() {
  const getEmailUser = localStorage.getItem("emailUser");
  const getToken = localStorage.getItem("token");
  const idUser = localStorage.getItem("idUser");
  const getRole = localStorage.getItem("role");

  const [photoProfile, setPhotoProfile] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    window.location.reload()
  }

  useEffect(() => {
    if (getRole === "ADMIN"){
      navigate("/admin/index")
    }
  })

  useEffect(() => {
    axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/users", { headers: {"Authorization" : `Bearer ${getToken}`} })
    .then(res => {
      // console.log(res.data.data.obj.airplane_name);
      const datas = res.data.data;
    
      // setIdTicket(idTick)
      setUser(datas);
    })
    .catch((err) => {
      console.log(err)
    });
    // console.log(idUser);
    // console.log(user);
});



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
  return (
    <>
          {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
              <img src={Logo} width={80} height={80} alt="logo" />
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
                  
                  <Nav.Link><Link to={"user/" + idUser} style={{textDecoration:"none"}}><img src={photoProfile ? photoProfile : defaultProfile} style={{width:"25px", height:"25px", borderRadius:"50%"}} className="text-center" alt="profile image"/> Welcome back, {getEmailUser}</Link></Nav.Link>
                  <ButtonSignOut onClick={logOut}>LOG OUT</ButtonSignOut> 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    {/* <div>hello, {getEmailUser}</div>
    <button onClick={logOut}>LOG OUT</button> */}
    <HeroAfterLogin />
    <WhyUs />
    <Benefits />
    <Footer />
    </>
  )
}

export default IndexAfterLogin