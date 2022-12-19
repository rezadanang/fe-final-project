import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import IndexAfterLogin from './IndexAfterLogin';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';


const BodyLogin = styled.section`
    background: #fff;
    height: 1000px;
`;

const WrapperFormLogin = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
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

const ButtonLoginGoogle = styled.button`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 5em;
    border: 2px solid #FFFFFF;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

const TextBottomLogin = styled.p`
    font-size: 13px;
    color: #FFFFFF;
`;



function Login() {

    // stateErr = {};

    const navigate = useNavigate();

    const getToken=localStorage.getItem("token");
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);
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
            console.log(res.data);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("emailUser", res.data.user);
            navigate("/");
    })
        .catch((err) => {
            const errMsg = err.response.data.error.message
            // console.log(errMsg)
            setError(errMsg);
        });
        // .catch((err) => console.error(err));
    }

    const handlePasswordVisibility = () =>{
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };



   
  
  return (
   
    <div>
         {
        getToken? <IndexAfterLogin /> :
        <>
        <BodyLogin>
        <WrapperFormLogin> 
        <div className='alert danger-alert' role='alert'>
                <p className='text-danger text-center'>{error}</p>
        </div>
        <TitleLogin style={{textAlign: "center"}}>Sign In</TitleLogin>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" required>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Input email" controlId="email" required onChange={(e)=>setValues({...values,email:e.target.value})}/>
                    <Form.Control.Feedback type="invalid">Please fill the email!</Form.Control.Feedback>
                    <p style={{fontSize:"13px"}}>We'll never share your email with anyone else.</p>
                </Form.Group>
                <Form.Group className="mb-3" required>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Input password" controlId="password" required onChange={(e)=>setValues({...values,password:e.target.value})}/>
                    <Form.Control.Feedback type="invalid">Please fill the password!</Form.Control.Feedback>
                </Form.Group>
                <ButtonLogin className='mx-auto' style={{textAlign: "center"}} type="submit">Sign In</ButtonLogin>
            </Form>
            <ButtonLoginGoogle className='mx-auto mt-3' style={{textAlign: "center"}}>Login with Google <FaGoogle /></ButtonLoginGoogle>
            <TextBottomLogin className='text-center mt-4'>If you dont have account, <Link to="/signup" style={{ color: '#FFF', textDecoration: 'none' }}>Sign Up Here</Link></TextBottomLogin>
        {/* <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" onChange={(e)=>setValues({...values,email:e.target.value})} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>setValues({...values,password:e.target.value})} />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> */}
      </WrapperFormLogin>
      </BodyLogin>
      </>
    }
    </div>
    
  )
}

export default Login