import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EditAirplanes() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";

    const [idAirplanes, setIdAirplanes] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

  useEffect(() => {
    if (getRole === "CUSTOMER"){
      navigate("/")
    }
  })

    useEffect(() => {
        getAirplanesById();
      }, []);

      const updateAirplanes = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/update/${id}`, {
            name : name,
            code: code,
            country: country
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        navigate("/admin/airplanes");
        alert("berhasil update")
        }
        
        catch (err) {
            console.log(err.message)
        }
    };

    const deleteAirplanes = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
        navigate("/admin/airplanes");
      alert("berhasil delete")
      }
      catch (err) {
          console.log(err)
      }
  };
  

  

      const getAirplanesById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirplanes(response.data.data.id);
        setName(response.data.data.name);
        setCode(response.data.data.code)
        setCountry(response.data.data.country)
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (

    <div className='container mx-auto'>
      <form onSubmit={updateAirplanes}>
      <div class="form-group">
        <label for="exampleInputEmail1">Id Airplanes</label>
        <input type="text" class="form-control" value={idAirplanes} placeholder="null" onChange={(e) => setIdAirplanes(e.target.value)} disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Name Airplane</label>
        <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Code</label>
        <input type="text" class="form-control" value={code} placeholder="null" onChange={(e) => setCode(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" value={country} placeholder="null" onChange={(e) => setCountry(e.target.value)} />
      </div>

      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Update
            </button>
           </div>
           <div className="field">
           <button className="btn btn-danger" onClick={deleteAirplanes}><FontAwesomeIcon icon={faTrash} /> Delete</button>
           </div>
      </form>
    </div>

  )
}

export default EditAirplanes