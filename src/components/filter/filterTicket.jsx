import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Col, Row, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Logo from "../../assets/logo.png"  
import { Link } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios'
import Moment from 'react-moment';


const WrapperHero = styled.section`
    height: 600px;
`;

const Wrapper = styled.section`
  margin-top: 15em;
  padding: 5em;
  background: #4600FF;
  border-radius: 10px;
`;

const TitleFormFilter = styled.p`
  color: white;
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
const ButtonNavTab = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    display: block;
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
`;

function FilterTicket() {
    const getEmailUser = localStorage.getItem("emailUser");
    const getToken = localStorage.getItem("token");
    const logOut = () => {
        localStorage.clear();
        window.location.reload()
    }

    const [tickets, setTickets] = useState([]);
    const [displayTickets, setDisplayTickets] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [derpartureDate, setDerpartureDate] = useState('');
    const [derpartureTime, setDerpartureTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');

    const newDerpartureDateTime = derpartureDate + derpartureTime;
    const newReturnDateTime = returnDate + returnTime;


    //disable form return
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("");



    // const getData = () => {
    //   axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/tickets", { headers: {"Authorization" : `Bearer ${getToken}`} })
    //   .then((response) => response.json())
    //   .then((data) => {
        
    //     setData(data)
    //     console.log(setData)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   });
    // }

    
    useEffect(() => {
      axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/tickets", { headers: {"Authorization" : `Bearer ${getToken}`} })
      .then(res => {
        // console.log(res.data.data);
        const datas = res.data.data;
        setTickets(datas);
      })
      .catch((err) => {
        console.log(err)
      });
  });

  const showTicketsData = (e) => {
    e.preventDefault();
    // console.log('dest', newDerpartureDateTime);
    // console.log('ret', newReturnDateTime);
    const filteredTickets = tickets.filter(item =>  (item.origin === origin && item.destination === destination) && (item.arrival_time >= newReturnDateTime && item.departure_time >= newDerpartureDateTime));
    setDisplayTickets(filteredTickets);
  }

  
    
    console.log(getToken)
    if (getToken) {
        return (
        <>
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
                  <Nav.Link href="#action2">Schedule</Nav.Link>
                  <Nav.Link href="#action2">Passenger</Nav.Link>
                  <Nav.Link href="#action2">Your Orders</Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                  <Nav.Link href="#action1">Welcome back, {getEmailUser}</Nav.Link>
                  <ButtonSignOut onClick={logOut}>LOG OUT</ButtonSignOut> 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        <WrapperHero className='hero-wrapper-filter'>
            <Container>
                <Wrapper>
                  <Form>
                   <Row>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="origin" style={{color:"white"}}>Origin</Form.Label>
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
                            <Form.Label htmlFor="destination" style={{color:"white"}}>Destination</Form.Label>
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
                            <Form.Label htmlFor="derpartureDate" style={{color:"white"}}>Derparture Date</Form.Label>
                            <Form.Control type="date" id="derpartureDate" aria-describedby="derpartureDate" onChange={(e) => setDerpartureDate(e.target.value)} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="derpartureTime" style={{color:"white"}}>Derparture Time</Form.Label>
                            <Form.Control type="time" id="derpartureTime" aria-describedby="derpartureTime" onChange={(e) => setDerpartureTime(e.target.value)} />
                          </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6} md={3}>
                          <Form.Group className='mt-4'>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" name="checkbox" checked={checked} 
                              onChange={() => {
                                  if(checked){
                                  setText('')
                                }
                                  setChecked(!checked)
                                }
                              } 
                              />
                               <label className="form-check-label" htmlFor="flexCheckDefault" style={{color:"white"}}> Round Trip?</label>
                            </div>

                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="return" style={{color:"white"}}>Return Date</Form.Label>
                            <Form.Control type="date" name="return" id="return" aria-describedby="return" disabled={!checked}  onChange={(e) => setReturnDate(e.target.value)}/>
                        </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                        <Form.Group>
                            <Form.Label htmlFor="returnTime" style={{color:"white"}}>Return Time</Form.Label>
                            <Form.Control type="time" name="returnTime" id="returnTime" aria-describedby="returnTime" disabled={!checked}  onChange={(e) => setReturnTime(e.target.value)}/>
                        </Form.Group>
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
                    <p>Airline: {item.airplane_name}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p>From: {item.origin}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p>To: {item.destination}</p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p>Rp.{item.price}</p>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col sm={true} className='text-center'>
                    <p>Derparture: <Moment format='HH:mm DD-MM-YYYY'>{item.departure_time}</Moment></p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p>Arrival: <Moment format='HH:mm DD-MM-YYYY'>{item.arrival_time}</Moment></p>
                  </Col>
                  <Col sm={true} className='text-center'>
                  <p>Category: {item.category}</p>
                  </Col>
                  <Col sm={true}>
                    <ButtonBooking className='mx-auto'>Booking</ButtonBooking>
                  </Col>
                </Row>
              </WrapperTicket>
              </Container>
              
              </>
              )) : <p className="text-center mt-5">Tiket Tidak Tersedia</p>
                
            }
        
        </>
            )
      } 
      else { 
        return (
            <Login />
        )}
}

export default FilterTicket