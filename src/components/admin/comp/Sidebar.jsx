import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
function Sidebar() {
  return (
    <>
    <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundcolor: "#e9ecef"}}>
    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
      <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5>Administrator</h5></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="#"><i className="fas fa-user font-weight-bold" /> <span classname="ml-3">All Tickets</span></a></li>
      
    </ul>
  </div>
  </>

  )
}

export default Sidebar