import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Logo from "../../assets/logo.png"
import GooglePlay from "../../assets/google-play-badge.png"
import { FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';

const WrapperFooter = styled.section`
    margin-top: 4em;   
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
                <Row>  
                    <Col lg={6}>
                    <img src={Logo} width={180} height={180} alt="logo" ></img>
                    </Col>
                    <Col lg={6} className="text-center">
                    <Row>
                        <Col>
                            <img src={GooglePlay} width={200} height={80} alt="Google Play" ></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <ul id="myRow">
                            <li className='li-icon'><FaInstagram style={styleIcons} /></li>
                            <li className='li-icon'><FaTwitter style={styleIcons} /></li>
                            <li className='li-icon'><FaLinkedin style={styleIcons} /></li>
                            <li className='li-icon'><FaTiktok style={styleIcons} /></li>
                        </ul>                        
                        </Col>
                    </Row>
                    </Col>
                </Row> 
                <Line />
                <TextFooter>E-Flight for Final Project</TextFooter>
            </Container>
        </WrapperFooter>
  )
}

export default Footer