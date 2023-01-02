import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddAirports() {
    const getToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM"
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        Name: "",
        City: "",
        Country: "",
        Country_code: ""
        
    })

    const getRole = localStorage.getItem("role");

    useEffect(() => {
      if (getRole === "CUSTOMER"){
        navigate("/")
      }
    })

    const handleSubmitAirport = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://final-project-be-production-6de7.up.railway.app/api/v1/airports/add', {
                name: values.name,
                city: values.city,
                country: values.country,
                country_code: values.country_code
            },
            {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          })
          navigate("/admin/airport");
          alert("berhasil menambahkan bandara")
          }
          
          catch (err) {
              console.log(err)
          }
    }
  return (
    <>
      <div className='container'>
      <form onSubmit={handleSubmitAirport}>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id='name' placeholder="Name" onChange={(e)=>setValues({...values,name:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">City</label>
        <input type="text" class="form-control" id='city' placeholder="City" onChange={(e)=>setValues({...values,city:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" id='country' placeholder="Country" onChange={(e)=>setValues({...values,country:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country_code</label>
        <input type="text" class="form-control" id='country_code' placeholder="Country_Code" onChange={(e)=>setValues({...values,country_code:e.target.value})} required />
      </div>

      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Add AirPort
            </button>
           </div>
      </form>
    </div>
    </>
  )
}

export default AddAirports