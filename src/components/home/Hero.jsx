import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WrapperHero = styled.section`
    height: 500px;
`;

const WrapperButtonHero = styled.section`
    margin: 0;
    position: absolute;
    top: 65%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const ButtonHero = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 5em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;
function Hero() {
  return (
    <WrapperHero className='hero-wrapper'>
        <WrapperButtonHero>
        <Link to="/filter"><ButtonHero>Start Booking</ButtonHero></Link>
        </WrapperButtonHero>    
    </WrapperHero>
  )
}

export default Hero