import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import defaultProfile from '../../../assets/avatarr.png'
import Login from '../../Login';


function DetailUsers() {
    const getToken = localStorage.getItem("token");
    const [idUsers, setIdUsers] = useState("");
    const [noKtp, setNoKTP] = useState("");
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [photoProfile, setPhotoProfile] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

    useEffect(() => {
        getUsersById();
      }, []);


      const getUsersById = async () => {
        const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
       console.log(response);
        setIdUsers(response.data.data.id);
        setNoKTP(response.data.data.noKtp);
        setUserName(response.data.data.username)
        setName(response.data.data.name)
        setGender(response.data.data.gender)
        setContact(response.data.data.contact)
        setDateOfBirth(response.data.data.dateOfBirth)
        setPhotoProfile(response.data.data.photoProfile)
        setEmail(response.data.data.email)
      };
    
      if (getToken) {
        return (
      <>
      <h4 className='text-center mt-4'>Delete Wishlist</h4>  
    <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
    <div className='container p-5'>
    <img src={photoProfile ? photoProfile : defaultProfile} style={{width:"250px", height:"250px", borderRadius:"50%"}} className="mx-auto d-block" alt="profile image"/>
    <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Id Users</label>
              <input type="text" class="form-control" value={idUsers} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>No KTP</label>
              <input type="text" class="form-control" value={noKtp} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>User Name</label>
              <input type="text" class="form-control" value={username} placeholder="null" disabled />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Name</label>
                <input type="text" class="form-control" value={name} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Gender</label>
              <input type="text" class="form-control" value={gender} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Contact</label>
              <input type="text" class="form-control" value={contact} placeholder="null" disabled />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Date Of Birth</label>
              <input type="text" class="form-control" value={dateOfBirth} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            {/* <div class="form-group">
              <label style={{color:"white"}}>Photo Profile</label>
              <input type="text" class="form-control" value={photoProfile} placeholder="null" disabled />
            </div> */}
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Email</label>
              <input type="text" class="form-control" value={email} placeholder="null" disabled />
            </div>
          </div>
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
export default DetailUsers