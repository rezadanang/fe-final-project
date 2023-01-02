import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function NavAdmin() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login")

  }
  return (
    <nav className="navbar navbar-light bg-primary navbar-dark navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <span className="navbar-brand">E-Flight Admin</span>
        
        <button className='btn btn-danger' onClick={logOut}>LOG OUT <FontAwesomeIcon icon={faRightFromBracket} /></button>
      </div>
    </nav>
  )
}

export default NavAdmin