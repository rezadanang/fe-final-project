import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import NavAdmin from '../comp/NavAdmin';
import Sidebar from '../comp/Sidebar';
import DataTickets from '../comp/DataTickets';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";



function AdminTicket() {
  const getRole = localStorage.getItem("role");
  const navigate = useNavigate();

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

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
                <DataTickets />
              </div>
          </div>  
    </div>
   
    

    
    </>
  )
}

export default AdminTicket