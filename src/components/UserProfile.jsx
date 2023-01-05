import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from '../assets/avatarr.png'
import styled from 'styled-components';
import { Container, Col, Row, Form, Nav, Navbar, Offcanvas, InputGroup } from 'react-bootstrap';
import Logo from "../assets/logo.png"  
import {Helmet} from "react-helmet";

const ButtonUpdateProfile = styled.button`
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


function UserProfile() {
    const getToken = localStorage.getItem("token");
    const getEmailUser = localStorage.getItem("emailUser");
    const idUser = localStorage.getItem("idUser");
    const navigate = useNavigate();
    
    const logOut = () => {
      localStorage.clear();
      navigate("/")
  }


    const [photoProfile, setPhotoProfile] = useState(null);
    const [idKtp, setIdKtp] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    

    useEffect(() => {
        getProfileById();
      }, []);

      const getProfileById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/${idUser}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setPhotoProfile(response.data.data.photoProfile)
        setIdKtp(response.data.data.noKtp);
        setUsername(response.data.data.username);
        setName(response.data.data.name);
        setPhone(response.data.data.contact);
        setEmail(response.data.data.email);
        setGender(response.data.data.gender);
        
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>E-Flight | Profile</title>
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
                  
                  <ButtonSignOut onClick={logOut}>LOG OUT</ButtonSignOut> 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
     <div className='container container-profile mt-5 mb-5' style={{ borderRadius:"20px", background:"#F5F6FA"}}>
     
      <div className='container p-5'>
      <form>
      <img src={photoProfile ? photoProfile : defaultProfile} style={{width:"250px", height:"250px", borderRadius:"50%"}} className="mx-auto d-block" alt="profile image"/>
      <div className='row'>
        <div className='col lg-6'>
        <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="text" class="form-control" value={email} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
          </div>
          {/* <div class="form-group">
            <label for="exampleInputEmail1">ID User</label>
            <input type="text" class="form-control" value={idKtp} placeholder="null" onChange={(e) => setIdKtp(e.target.value)} disabled />
          </div> */}
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" value={username} placeholder="null" onChange={(e) => setUsername(e.target.value)} disabled/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label for="exampleInputEmail1">Phone</label>
            <input type="text" class="form-control" value={phone} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label for="exampleInputEmail1">No KTP</label>
            <input type="text" class="form-control" value={idKtp} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label for="exampleInputEmail1">Gender</label>
            <input type="text" class="form-control" value={gender} placeholder="null" onChange={(e) => setGender(e.target.value)} disabled/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          
        </div>
        <div className='col lg-6'>
          <div className="field mt-4">
            <Link to={"edit"}><ButtonUpdateProfile>Update</ButtonUpdateProfile></Link>
          </div>
        </div>
      </div>
     
      
      
      
      

      {/* <div className="field">
             <button type="submit" className="btn btn-primary" >
              Update
            </button>
           </div>
           <div className="field">
           <button className="btn btn-danger" onClick={deleteTicket}><FontAwesomeIcon icon={faTrash} /> Delete</button>
           </div> */}
      </form>
    </div>
    </div>
    </>
  )
}

export default UserProfile