import React from 'react'
import Dashboard from '../comp/Dashboard'
import NavAdmin from '../comp/NavAdmin'
import Sidebar from '../comp/Sidebar'
import 'bootstrap/dist/css/bootstrap.css';


function Admin() {
  return (
    <>
     <div>
        <NavAdmin />
          <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <Dashboard />
              </div>
          </div>  
    </div>
   
    

    
    </>
  )
}

export default Admin