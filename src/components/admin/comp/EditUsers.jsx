import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EditUsers() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";

    const [idUsers, setIdUsers] = useState("");
    const [noKtp, setNoKTP] = useState("");
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [photoProfile, setPhotoProfile] = useState("");
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

      const updateUsers = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/update/${id}`, {
            contact : contact,
            gender: gender,
            dateOfBirth: dateOfBirth
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        navigate("/users");
        alert("berhasil update")
        }
        
        catch (err) {
            console.log(err.message)
        }
    };


  

  

      const getUsersById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdUsers(response.data.data.id);
        setNoKTP(response.data.data.noKtp);
        setUserName(response.data.data.username);
        setName(response.data.data.name)
        setContact(response.data.data.contact)
        setGender(response.data.data.gender)
        setDateOfBirth(response.data.data.dateOfBirth)
        setPhotoProfile(response.data.data.photoProfile)
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (

    <div className='container mx-auto'>
      <form onSubmit={updateUsers}>
      <div class="form-group">
        <label for="exampleInputEmail1">Id User</label>
        <input type="text" class="form-control" value={idUsers} placeholder="null" onChange={(e) => setIdUsers(e.target.value)} disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">No Ktp</label>
        <input type="text" class="form-control" value={noKtp} placeholder="null" onChange={(e) => setNoKTP(e.target.value)} disabled/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">User Name</label>
        <input type="text" class="form-control" value={username} placeholder="null" onChange={(e) => setUserName(e.target.value)} disabled/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Contact</label>
        <input type="text" class="form-control" value={contact} placeholder="null" onChange={(e) => setContact(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Gender</label>
        <input type="text" class="form-control" value={gender} placeholder="null" onChange={(e) => setGender(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Date Of Birth</label>
        <input type="text" class="form-control" value={dateOfBirth} placeholder="null" onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Photo Profile</label>
        <input type="text" class="form-control" value={photoProfile} placeholder="null" onChange={(e) => setPhotoProfile(e.target.value)} />
      </div>
      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Update
            </button>
           </div>
      </form>
    </div>

  )
}

export default EditUsers