import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddAirplanes() {
    const getToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM"
    const navigate = useNavigate();

    const getRole = localStorage.getItem("role");

  useEffect(() => {
    if (getRole === "CUSTOMER"){
      navigate("/")
    }
  })
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        Name: "",
        Code: "",
        Country: ""
        
    })

    const handleSubmitAirplanes = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/add', {
                name: values.name,
                code: values.code,
                country: values.country
            },
            {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          })
          navigate("/admin/airplane");
          alert("berhasil menambahkan pesawat")
          }
          
          catch (err) {
              console.log(err)
          }
    }
  return (
    <>
      <div className='container'>
      <form onSubmit={handleSubmitAirplanes}>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id='name' placeholder="Name" onChange={(e)=>setValues({...values,name:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Code</label>
        <input type="text" class="form-control" id='code' placeholder="Code" onChange={(e)=>setValues({...values,code:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" id='country' placeholder="Country" onChange={(e)=>setValues({...values,country:e.target.value})} required />
      </div>

      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Add AirPlanes
            </button>
           </div>
      </form>
    </div>
    </>
  )
}

export default AddAirplanes