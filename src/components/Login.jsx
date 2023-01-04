import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Nav, Navbar, Offcanvas, InputGroup } from 'react-bootstrap';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import IndexAfterLogin from './IndexAfterLogin';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import logoWhite from '../assets/logo-white.png'
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const BodyLogin = styled.section`
    background: #fff;
    height: 1000px;
`;

const WrapperFormLogin = styled.div`
    margin: 0;
    position: fixed;
    top: 50%;
    margin-left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #4600FF;
    color: white;
    border-radius: 10px;
    padding: 40px 80px
`;

const ButtonLogin = styled.button`
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

const TitleLogin = styled.h3`
    color: white;
`;

const TextBottomLogin = styled.p`
    font-size: 13px;
    color: #FFFFFF;
`;



function Login() {

    const navigate = useNavigate();

    const getToken=localStorage.getItem("token");
    const getRole=localStorage.getItem("role");
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const {icons, setIcon} = useState('faEye');
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false, 
    })
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        setValidated(true);
        axios.post("https://final-project-be-production-6de7.up.railway.app/api/auth/login",{
            email: values.email,
            password: values.password
        })
        .then(res => {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("emailUser", res.data.user);
            localStorage.setItem("idUser", res.data.id);
            localStorage.setItem("role", res.data.role);
            navigate("/");
    })
        .catch((err) => {
            const errMsg = err.response.data.error.message
            setError(errMsg);
        });
       
    }

    // const handlePasswordVisibility = () =>{
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

   


   
    if (getToken) {
        return (
            <IndexAfterLogin />
        )
    } else{
        return (
            <>
             <Helmet>
                <meta charSet="utf-8" />
                <title>E-Flight | Login</title>
        </Helmet>
            <BodyLogin>
            <WrapperFormLogin> 
            <div className='alert danger-alert' role='alert'>
                    <p className='text-danger text-center'>{error}</p>
            </div>
            <div className='text-center'>
                <img src={logoWhite} width={100} height={100}></img>
            </div>
           
            <TitleLogin style={{textAlign: "center"}}>Sign In</TitleLogin>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" required>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Input email" controlId="email" required onChange={(e)=>setValues({...values,email:e.target.value})}/>
                        <Form.Control.Feedback type="invalid">Please fill the email!</Form.Control.Feedback>
                        <p style={{fontSize:"13px"}}>We'll never share your email with anyone else.</p>
                    </Form.Group>   
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3" required>
                        <Form.Control aria-describedby="password" type={passwordShown ? "text" : "password"} placeholder="Input password" controlId="password" required onChange={(e)=>setValues({...values,password:e.target.value})} />
                        <InputGroup.Text><FontAwesomeIcon icon={faEye} onClick={togglePassword} /></InputGroup.Text>
                    </InputGroup>
                    {/* <Form.Control.Feedback id="password" type="invalid"> Please fill the password!</Form.Control.Feedback> */}
                    <ButtonLogin className='mx-auto' style={{textAlign: "center"}} type="submit">Login</ButtonLogin>
                </Form>
                {/* <ButtonLoginGoogle className='mx-auto mt-3' style={{textAlign: "center"}}>Login with Google <FaGoogle /></ButtonLoginGoogle> */}
                <TextBottomLogin className='text-center mt-4'>If you dont have account, <Link to="/signup" style={{ color: '#FFF', textDecoration: 'none' }}>Sign Up Here</Link></TextBottomLogin>
            
          </WrapperFormLogin>
          </BodyLogin>
        
          </>
        )
    }
}
export default Login