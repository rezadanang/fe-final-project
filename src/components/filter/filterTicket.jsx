import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Col, Row, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Logo from "../../assets/logo.png"  
import { Link } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios'


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

    const [tickets, setTickets] = useState('');


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
        console.log(res.data.data);
        const datas = res.data.data;
        setTickets(datas);
      })
      .catch((err) => {
        console.log(err)
      });
  });
    
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
                  <Nav.Link href="#action1">All Flights</Nav.Link>
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
                    <Row>
                        <Col md={4}>
                            <Form.Label htmlFor="inputFrom" style={{color:"white"}}>From</Form.Label>
                            <Form.Control type="text" id="from" aria-describedby="fromText"/>
                        </Col>
                        <Col md={4}>
                            <Form.Label htmlFor="inputTo" style={{color:"white"}}>To</Form.Label>
                            <Form.Control type="text" id="to" aria-describedby="toText"/>
                        </Col>
                        <Col md={4}>
                            <Form.Label htmlFor="date" style={{color:"white"}}>Tanggal</Form.Label>
                            <Form.Control type="date" id="date" aria-describedby="date"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label htmlFor="penumpang" style={{color:"white"}}>Penumpang</Form.Label>
                            <Form.Control type="text" id="penumpang" aria-describedby="penumpang"/>
                        </Col>
                        <Col md={4}>
                            <Form.Label htmlFor="kelas" style={{color:"white"}}>Kelas</Form.Label>
                            <Form.Control type="text" id="kelas" aria-describedby="kelas"/>
                        </Col>
                        <Col md={4}>
                        
                            <ButtonFilter className="mx-auto">Cari</ButtonFilter>
                        </Col>
                    </Row>
                </Wrapper>
            </Container>
        </WrapperHero> 
        <h1 className="text-center">FLIGHT SCHEDULE</h1>
        {/* <button onClick={getData}>ambil data</button> */}
        {   
              tickets.length > 0 ? (
              tickets.map((item) =>
              <>
              <Container>
              <WrapperTicket>
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
                <Row>
                  <Col sm={true} className='text-center'>
                  </Col>
                  <Col sm={true} className='text-center'>
                  </Col>
                  <Col sm={true} className='text-center'>
                  </Col>
                  <Col sm={true}>
                    <ButtonBooking className='mx-auto'>Booking</ButtonBooking>
                  </Col>
                </Row>
              </WrapperTicket>
              </Container>
              
              </>
              )) : <p className="text-center">Tiket Tidak Tersedia</p>
                
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