import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHome } from '@fortawesome/free-solid-svg-icons';
function Sidebar() {
  return (
    <>
    <div className="col-md-3 col-lg-2 bg-light sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundcolor: "#e9ecef"}}>
    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
      <li className="nav-item mb-2 mt-3"><Link className="nav-link" to="/"><button className='btn btn-primary'><FontAwesomeIcon icon={faHome} /> HOME</button></Link></li>
      <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="/admin"><h5>Administrator</h5></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/admin"><i className="fas fa-user font-weight-bold" /> <span classname="ml-3">All Tickets</span></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/admin/airplane"><i className="fas fa-user font-weight-bold" /> <span classname="ml-4">All Airplanes</span></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/admin/airport"><i className="fas fa-user font-weight-bold" /> <span classname="ml-2">All Airport</span></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/admin/user"><i className="fas fa-user font-weight-bold" /> <span classname="ml-1">All Users</span></a></li>
      <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/admin/orders"><i className="fas fa-user font-weight-bold" /> <span classname="ml-1">All Orders</span></a></li>
    </ul>
  </div>
  </>

  )
}

export default Sidebar