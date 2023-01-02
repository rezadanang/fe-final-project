import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import NavAdmin from '../comp/NavAdmin';
import Sidebar from '../comp/Sidebar';
import DataUsers from '../comp/DataUsers';
import { useNavigate } from 'react-router-dom';



function AdminUser() {
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
                <DataUsers />
              </div>
          </div>  
    </div>
   
    

    
    </>
  )
}

export default AdminUser