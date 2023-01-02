import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EditAirports() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";

    const [idAirports, setIdAirports] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [country_code, setCountry_Code] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

    useEffect(() => {
      if (getRole === "CUSTOMER"){
        navigate("/")
      }
    })

    useEffect(() => {
        getAirportsById();
      }, []);

      const updateAirports = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/update/${id}`, {
            name : name,
            city: city,
            country: country,
            country_code: country_code
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        navigate("/airport");
        alert("berhasil update")
        }
        
        catch (err) {
            console.log(err.message)
        }
    };

    const deleteAirports = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
      navigate("/airport");
      alert("berhasil delete")
      }
      catch (err) {
          console.log(err)
      }
  };
  

  

      const getAirportsById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirports(response.data.data.id);
        setName(response.data.data.name);
        setCity(response.data.data.city)
        setCountry(response.data.data.country)
        setCountry_Code(response.data.data.country_code)
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (

    <div className='container mx-auto'>
      <form onSubmit={updateAirports}>
      <div class="form-group">
        <label for="exampleInputEmail1">Id Airport</label>
        <input type="text" class="form-control" value={idAirports} placeholder="null" onChange={(e) => setIdAirports(e.target.value)} disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Name Airport</label>
        <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">City</label>
        <input type="text" class="form-control" value={city} placeholder="null" onChange={(e) => setCity(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" value={country} placeholder="null" onChange={(e) => setCountry(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country_Code</label>
        <input type="text" class="form-control" value={country_code} placeholder="null" onChange={(e) => setCountry_Code(e.target.value)} />
      </div>

      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Update
            </button>
           </div>
           <div className="field">
           <button className="btn btn-danger" onClick={deleteAirports}><FontAwesomeIcon icon={faTrash} /> Delete</button>
           </div>
      </form>
    </div>

  )
}

export default EditAirports