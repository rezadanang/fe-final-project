import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Row, Container, Col, Accordion } from 'react-bootstrap';
import styled from 'styled-components';

const TextLeft = styled.h1`
  font-size: 1.5em;
  color: white;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: #4600FF;
  border-radius: 10px;
`;

function WhyUs() {
  return (
    <Container style={{marginTop:"-50px"}}>
            <Wrapper>
                <Row>
                    <Col lg={6}>
                        <TextLeft>Reservasi tiket maskapai harga lebih murah? Kami solusinya</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Mudah</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Praktis</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Aman</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Nyaman</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Cepat</TextLeft>
                        <TextLeft><FontAwesomeIcon icon={faCheckCircle} style={{color:"greenyellow"}} /> Terjangkau</TextLeft>
                    </Col>
                    <Col lg={6}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Apa saja syarat yang di butuhkan?</Accordion.Header>
                                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                            
                        </Accordion>
                        <Accordion className='mt-2'>
                        <Accordion.Item eventKey="1">
                                <Accordion.Header>Apakah dapat melakukan refund?</Accordion.Header>
                                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Apakah akan dikenakan sanksi?</Accordion.Header>
                                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Bagaimana bila tertinggal penerbangan?</Accordion.Header>
                                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Apakah penerbangan bisa di wakilkan?</Accordion.Header>
                                <Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Wrapper>
        </Container>
  )
}

export default WhyUs