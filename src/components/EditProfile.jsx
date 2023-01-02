import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from '../assets/avatarr.png'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";

const ButtonSaveProfile = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

function EditProfile() {

    const inputRef = useRef()

    const getToken = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");

    const [photoProfile, setPhotoProfile] = useState("");
    const [idKtp, setIdKtp] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    function handleImage(e){
        console.log(e.target.value)
        setPhotoProfile(e.target.value[0])
    }

    useEffect(() => {
        getProfileById();
      }, []);

    const onImageUpload = (e) => {
        let fileProfile = e.target.files[0];
        setPhotoProfile(fileProfile)
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        console.log(photoProfile);

        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/update/${idUser}`, {
            photoProfile : photoProfile,
            noKtp: idKtp,
            username: username,
            contact: phone,
            name: name
          },
          {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + getToken
          }
        })
        toast.success('Profile has been updated', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(() => {
          navigate("/user/"+ idUser)
        }, 3000);
        // navigate("/user/" + idUser);
        // alert("berhasil update")
        // console.log(photoProfile)
        }
        
        catch (err) {
            console.log(err)
        }
    };


    const getProfileById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/users/${idUser}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setPhotoProfile(response.data.data.photoProfile)
        setIdKtp(response.data.data.noKtp);
        setUsername(response.data.data.username);
        setName(response.data.data.name);
        setPhone(response.data.data.contact);
        setEmail(response.data.data.email);
        
      }catch (err){
        console.log(err);
      }
        
      };
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title> E-Flight | Edit Profile</title>
          </Helmet>
    <div className='container container-profile mt-5 mb-5' style={{ borderRadius:"20px", background:"#F5F6FA"}}>
    
     <div className='container p-5'>
     <form> 
     <label for="exampleInputEmail1">Image</label>
     <input type="file" name='photoProfile' id='photoProfile' class="form-control" onChange={(e) => onImageUpload(e)} />
     {/* <img src={photoProfile ? photoProfile : defaultProfile} style={{width:"250px", height:"250px", borderRadius:"50%"}} className="mx-auto d-block" alt="profile image"/> */}
     <div className='row'>
       <div className='col lg-6'>
       <div class="form-group">
           <label for="exampleInputEmail1">Email</label>
           <input type="text" class="form-control" value={email} placeholder="null" onChange={(e) => setEmail(e.target.value)} disabled/>
         </div>
       </div>
       <div className='col lg-6'>
         <div class="form-group">
           <label for="exampleInputEmail1">Username</label>
           <input type="text" class="form-control" value={username} placeholder="null" onChange={(e) => setUsername(e.target.value)}/>
         </div>
       </div>
     </div>
     <div className='row'>
       <div className='col lg-6'>
         <div class="form-group">
           <label for="exampleInputEmail1">Name</label>
           <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)}/>
         </div>
       </div>
       <div className='col lg-6'>
         <div class="form-group">
           <label for="exampleInputEmail1">Phone</label>
           <input type="text" class="form-control" value={phone} placeholder="null" onChange={(e) => setPhone(e.target.value)}/>
         </div>
       </div>
     </div>
     <div className='row'>
       <div className='col lg-6'>
         
       </div>
       <div className='col lg-6'>
         <div className="field mt-4">
            <ButtonSaveProfile onClick={updateProfile}>Save</ButtonSaveProfile>
           {/* <Link to={"edit"}><ButtonUpdateProfile>Update</ButtonUpdateProfile></Link> */}
         </div>
       </div>
     </div>
     </form>
   </div>
   </div>
   <ToastContainer />
   </>
  )
}

export default EditProfile