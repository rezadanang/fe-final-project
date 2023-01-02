import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function DetailUsers() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";
    const [idUsers, setIdUsers] = useState("");
    const [noKtp, setNoKTP] = useState("");
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [photoProfile, setPhotoProfile] = useState("");
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
    
  return (
      <>
   <div className='container'>
    
    <label for="exampleInputEmail1">Id Users</label>
    <input type="text" class="form-control" value={idUsers} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">No KTP</label>
    <input type="text" class="form-control" value={noKtp} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">User Name</label>
    <input type="text" class="form-control" value={username} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" value={name} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Gender</label>
    <input type="text" class="form-control" value={gender} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Contact</label>
    <input type="text" class="form-control" value={contact} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Date Of Birth</label>
    <input type="text" class="form-control" value={dateOfBirth} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Photo Profile</label>
    <input type="text" class="form-control" value={photoProfile} placeholder="null" disabled />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="text" class="form-control" value={email} placeholder="null" disabled />
  </div>

</>

)
}
export default DetailUsers