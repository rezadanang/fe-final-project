import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import NavAdmin from '../comp/NavAdmin';
import Sidebar from '../comp/Sidebar';
import DataOrders from '../comp/DataOrders';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Login from '../../Login';



function AdminOrders() {
  const getRole = localStorage.getItem("role");
  const getToken = localStorage.getItem("token");
  const navigate = useNavigate();

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})
if (getToken) {
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Admin E-Flight</title>
            </Helmet>
     <div>
        <NavAdmin />
          <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <DataOrders />
              </div>
          </div>  
    </div>
   
    

    
    </>
  )
}
else { 
  return (
    <Login />
  )
}
}

export default AdminOrders