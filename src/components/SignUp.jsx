import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import {Helmet} from "react-helmet";

const BodySignUp = styled.section`
    background: #fff;
    height: 1000px;
`;

const WrapperFormSignUp = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #4600FF;
    color: white;
    border-radius: 10px;
    padding: 40px 100px
`;
const TitleSignUp = styled.h3`
    color: white;
`;


const ButtonSignUp= styled.button`
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

const TextBottomSignUp = styled.p`
    font-size: 13px;
    color: #FFFFFF;
`;

function SignUp() {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        name: "",
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
        axios.post("https://final-project-be-production-6de7.up.railway.app/api/auth/register",{
            name: values.name,
            email: values.email,
            password: values.password
        })
        .then(res => {
            console.log(res.data);
            navigate("/login");
    })
        .catch((err) => {
            const errMsg = err.response.data.error.message
            // console.log(errMsg)
            setError(errMsg);
        });
    }

    const handlePasswordVisibility = () =>{
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>E-Flight | Sign Up</title>
        </Helmet>
    <BodySignUp>
        <WrapperFormSignUp>
        <div className='alert danger-alert' role='alert'>
                <p className='text-danger text-center'>{error}</p>
        </div>
        <TitleSignUp style={{textAlign: "center"}}>Sign Up</TitleSignUp>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" required>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Input name" controlId="name" onChange={(e)=>setValues({...values,name:e.target.value})} required/>
                <Form.Control.Feedback type="invalid">Please fill the name!</Form.Control.Feedback>
                
            </Form.Group>
            <Form.Group className="mb-3" required>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Input email" onChange={(e)=>setValues({...values,email:e.target.value})} controlId="email" required/>
                <Form.Control.Feedback type="invalid">Please fill the email!</Form.Control.Feedback>
                <p style={{fontSize:"13px"}}>We'll never share your email with anyone else.</p>
            </Form.Group>
            <Form.Group className="mb-3" required>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Input password" onChange={(e)=>setValues({...values,password:e.target.value})} controlId="password" required />
                <Form.Control.Feedback type="invalid">Please fill the password!</Form.Control.Feedback>
            </Form.Group>
            <ButtonSignUp className='mx-auto' style={{textAlign: "center"}}>Sign Up</ButtonSignUp>
        </Form>
        
        <TextBottomSignUp className='text-center mt-4'>Already have account?, <Link to="/login" style={{ color: '#FFF', textDecoration: 'none' }}>Sign In Here</Link></TextBottomSignUp>
    </WrapperFormSignUp>
</BodySignUp>
    </>
  )
}

export default SignUp