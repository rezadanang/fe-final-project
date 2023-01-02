import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import NavAdmin from '../comp/NavAdmin';
import Sidebar from '../comp/Sidebar';
import DataOrders from '../comp/DataOrders';
import { useNavigate } from 'react-router-dom';




function AdminOrders() {
  const getRole = localStorage.getItem("role");
  const navigate = useNavigate();

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})
  return (
    <>
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

export default AdminOrders