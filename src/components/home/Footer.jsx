import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Logo from "../../assets/logo.png"
import GooglePlay from "../../assets/google-play-badge.png"
import { FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';

const WrapperFooter = styled.section`
    margin-top: 15em;   
    padding: 3em;
    background: #FFE15D;
`;
const Line = styled.hr`
    margin-top: 100px;
    border: 0;
    border-top: 1px solid #4600FF;
    border-bottom: 1px solid #4600FF;
`;
const NavigationFooter = styled.h4`
    color: #4600FF;
`;
const TextNavigationFooter = styled.p`
    color: #4600FF;
`;
const TextFooter = styled.p`
    color: #4600FF;
    font-size: 15px;
    text-align: center;
`;

const styleIcons = { 
    color: "#4600FF", 
    fontSize: "35px" 
}

function Footer() {
  return (
            <WrapperFooter>
            <Container>
                <Row className='text-center'>  
                    <Col lg={4} md={4} xs={12}>
                        <img src={Logo} width={180} height={180} alt="logo" ></img>
                    </Col>
                    <Col lg={4} md={4} xs={12}>
                        <ul className="mt-5 p-0">
                            <li><a href="/all-flights" style={{textDecoration:"none"}}>All Flights</a></li>
                            <li><a href="/wishlist-order" style={{textDecoration:"none"}}>Wishlist</a></li>
                            <li><a href="/notification-order" style={{textDecoration:"none"}}>Notifications</a></li>
                            <li><a href="/history-order" style={{textDecoration:"none"}}>Your Orders</a></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={4} xs={12} className="text-center mt-4">
                        <img src={GooglePlay} width={200} height={80} alt="Google Play" ></img>
                        <p><a target="_blank" href="https://www.instagram.com/"><FaInstagram style={styleIcons} /></a><a target="_blank" href="https://www.twitter.com/" ><FaTwitter style={styleIcons} /></a><a target="_blank" href="https://www.linkedin.com/"><FaLinkedin  style={styleIcons} /></a><a target="_blank" href="https://www.tiktok.com/" ><FaTiktok style={styleIcons} /></a></p>
                    </Col>
                </Row> 
                <Line />
                <TextFooter>E-Flight for Final Project</TextFooter>
            </Container>
        </WrapperFooter>
  )
}

export default Footer