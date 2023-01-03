import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Col, Row, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Logo from "../assets/logo.png"  
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Moment from 'react-moment';
import Footer from '../components/home/Footer';
import { faCheckCircle, faCircleDollarToSlot, faCity, faClock, faHeart, faPlane, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultProfile from '../assets/avatarr.png'
import Lottie from 'react-lottie';
import animationData from '../lottie/no-data.json';
import {Helmet} from "react-helmet";

const WrapperHero = styled.section`
    height: 600px;
`;

const Wrapper = styled.section`
  margin-top: 15em;
  padding: 5em;
  background: #4600FF;
  border-radius: 10px;
`;


const ButtonFilter = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 5em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    margin-top: 30px;
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

const WrapperTicket = styled.div`
  margin-top: 15px;
  padding: 2em;
  background: #F5F6FA;
  border-radius: 10px;
`;

const ButtonBooking = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    display: block;
    text-decoration: none;
`;

const ButtonSignUp = styled.button`
    background-color: #4600FF;
    color: white;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #4600FF;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

const ButtonLogin = styled.button`
    background-color: #FFFFFF;
    color: black;
    font-size: 1em;
    padding: 0.25em 1em;
    border-radius: 30px;
    border: 2px solid #4600FF;
    display: block;
    text-decoration: none;
`;


function FilterBeforeLogin() {
    const getEmailUser = localStorage.getItem("emailUser");
    const getToken = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        window.location.reload()
    }

    const [tickets, setTickets] = useState([]);
    const [displayTickets, setDisplayTickets] = useState([]);
    const [idTicket, setIdTicket] = useState("");
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [derpartureDate, setDerpartureDate] = useState('');
    const [derpartureTime, setDerpartureTime] = useState('');
    const [category, setCategory] = useState('one_way');
    const [photoProfile, setPhotoProfile] = useState('');

    const newDerpartureDateTime = derpartureDate + derpartureTime;

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
    
    useEffect(() => {
      axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/tickets", { headers: {"Authorization" : `Bearer ${getToken}`} })
      .then(res => {
        // console.log(res.data.data.obj.airplane_name);
        const datas = res.data.data;
      
        // setIdTicket(idTick)
        setTickets(datas);
      })
      .catch((err) => {
        console.log(err)
      });
  });

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };




  const showTicketsData = (e) => {
    e.preventDefault();
  
    const filteredTickets = tickets.filter(item =>  (item.origin === origin && item.destination === destination) && (item.category === category && item.departure_time >= newDerpartureDateTime));
    setDisplayTickets(filteredTickets);

  }

  
   
        return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>E-Flight | Filter Tickets</title>
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
                  <Nav.Link><Link to="/all-flights" style={{textDecoration:"none"}}>All Flights</Link></Nav.Link>
                  <Nav.Link><Link to="/wishlist-order" style={{textDecoration:"none"}}>Wishlist</Link></Nav.Link>
                  <Nav.Link><Link to="/notification-order" style={{textDecoration:"none"}}>Notifications</Link></Nav.Link>
                  <Nav.Link><Link to="/history-order" style={{textDecoration:"none"}}>Your Orders</Link></Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                <Link to="/signup"><ButtonSignUp>Sign Up</ButtonSignUp></Link>
                <Link to="/login"><ButtonLogin>Login</ButtonLogin></Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        <WrapperHero className='hero-wrapper-filter'>
            <Container>
                <Wrapper className='bg-blue-filter'>
                  <Form>
                   <Row>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="origin" style={{color:"white"}}><FontAwesomeIcon icon={faCity} /> Origin</Form.Label>
                            <Form.Select aria-label="origin" onChange={(e) => setOrigin(e.target.value)}>
                              <option value="" selected disabled>Select Origin</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Medan">Medan</option>
                              <option value="Yogyakarta">Yogyakarta</option>
                              <option value="Surabaya">Surabaya</option>
                              <option value="Denpasar">Denpasar</option>
                              <option value="Makassar">Makassar</option>
                              <option value="Palembang">Palembang</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="destination" style={{color:"white"}}><FontAwesomeIcon icon={faCity} /> Destination</Form.Label>
                            <Form.Select aria-label="destination" onChange={(e) => setDestination(e.target.value)}>
                              <option value="" selected disabled>Select Destination</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Medan">Medan</option>
                              <option value="Yogyakarta">Yogyakarta</option>
                              <option value="Surabaya">Surabaya</option>
                              <option value="Denpasar">Denpasar</option>
                              <option value="Makassar">Makassar</option>
                              <option value="Palembang">Palembang</option>
                            </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="derpartureDate" style={{color:"white"}}><FontAwesomeIcon icon={faPlaneDeparture} /> Derparture Date</Form.Label>
                            <Form.Control type="date" id="derpartureDate" aria-describedby="derpartureDate" onChange={(e) => setDerpartureDate(e.target.value)} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="derpartureTime" style={{color:"white"}}><FontAwesomeIcon icon={faClock} /> Derparture Time</Form.Label>
                            <Form.Control type="time" id="derpartureTime" aria-describedby="derpartureTime" onChange={(e) => setDerpartureTime(e.target.value)} />
                          </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6} md={3}>
                          <Form.Group className='mt-4'>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="checkbox" value="round_trip"
                              onChange={(e) => setCategory(e.target.value)}
                              
                              />
                               <label className="form-check-label" htmlFor="flexCheckDefault" style={{color:"white"}}> Round Trip?</label>
                            </div>

                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>

                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            {/* <button onClick={showTicketsData}>carii</button> */}
                            <ButtonFilter className="mx-auto" onClick={showTicketsData}>Cari</ButtonFilter>
                        </Col>
                    </Row>
                    </Form>
                </Wrapper>
            </Container>
        </WrapperHero> 
        <h1 className="text-center mt-5">FLIGHT SCHEDULE</h1>
        {/* <button onClick={getData}>ambil data</button> */}
         {   
              displayTickets.length > 0 ? (
                displayTickets.map((item) =>
              <>
              <Container>
              <WrapperTicket className='mt-3'>
                <Row>
                  <Col sm={true} className='text-center'>
                    <p><FontAwesomeIcon icon={faPlane} /> Airline: {item.airplane_name}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p><FontAwesomeIcon icon={faCity} /> From: {item.origin}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p><FontAwesomeIcon icon={faCity} /> To: {item.destination}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p><FontAwesomeIcon icon={faCircleDollarToSlot} /> Rp.{item.price},-</p>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col sm={true} className='text-center'>
                    <p><FontAwesomeIcon icon={faPlaneDeparture} /> Derparture: <Moment format='HH:mm DD-MM-YYYY'>{item.departure_time}</Moment></p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p><FontAwesomeIcon icon={faPlaneArrival} /> Arrival: <Moment format='HH:mm DD-MM-YYYY'>{item.arrival_time}</Moment></p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p><FontAwesomeIcon icon={faCheckCircle} style={{color:"green"}} /> Category: {item.category}</p>
                  </Col>
                  <Col sm={true}>
                    <Link to={"order/" + item.id}>
                    <ButtonBooking className='mx-auto'>Booking</ButtonBooking>
                    </Link>
                    <Link to={"wishlist/" + item.id}>
                      <FontAwesomeIcon style={{color:"red"}} icon={faHeart} />
                    </Link>
                  </Col>
                </Row>
              </WrapperTicket>
              </Container>
              
              </>
              )) : <><h5 className="text-center mt-5">Data Tidak Tersedia</h5>
              <Lottie options={lottieOptions} height={400} width={400}/>
              </>
                
            }
        <Footer />
        </>
            )
      } 


export default FilterBeforeLogin