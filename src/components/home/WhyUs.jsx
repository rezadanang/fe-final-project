import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { Row, Container, Col, Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import AOS from 'aos';
import "aos/dist/aos.css";

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

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

  return (
    <Container style={{marginTop:"-50px"}} data-aos="fade-down">
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
                                <Accordion.Body>Untuk melakukan pemesanan tiket pesawat anda hanya membutuhkan ktp untuk warga negara indonesia, apabila anda adalah warga negara asing maka dibutuhkan pasport.
                                </Accordion.Body>
                            </Accordion.Item>
                            
                        </Accordion>
                        <Accordion className='mt-2'>
                        <Accordion.Item eventKey="1">
                                <Accordion.Header>Apakah dapat melakukan refund?</Accordion.Header>
                                <Accordion.Body>Refund dapat dilakukan apabila maskapai yang anda pesan mengizinkannya, karna ada beberapa maskapai yang tidak dapat melakukan refund.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Apakah akan dikenakan sanksi?</Accordion.Header>
                                <Accordion.Body>Anda dapat dikenakan sanksi apabila akan melakukan penerbangan anda membawa senjata tajam, obat-obatan terlarang, dan juga melakukan tindak kriminal.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Bagaimana bila tertinggal penerbangan?</Accordion.Header>
                                <Accordion.Body>Apabila anda tertinggal dalam penerbangan maka anda tidak dapat melakukan refund dan tiket akan hangus, Maka tetap perhatikan jadwal penerbangan anda.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className='mt-2'>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Apakah penerbangan bisa di wakilkan?</Accordion.Header>
                                <Accordion.Body>Penerbangan tidak dapat diwakilkan karna harus sesuai data yang ada di tiket.
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