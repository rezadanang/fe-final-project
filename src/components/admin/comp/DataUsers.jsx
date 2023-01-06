import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faEdit, faTrash, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";

function DataUsers() {

const getToken = localStorage.getItem("token");
const [loading, setLoading] = useState(false);
const [users, setUsers] = useState([]);
const navigate = useNavigate();
const { id } = useParams();


function dateFormat(value, row, index) {
    return moment(value).format('DD-MM-YYYY');
  }

const getUsersData = async () => {
    try{
        const data = await axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/users", { headers: {"Authorization" : `Bearer ${getToken}`} });
       
        setUsers(data.data.data);
        setLoading(true)
    }
    catch (err) {
        console.log(err)
    }
};



const columns = [
    {dataField: "id", text: "ID User", sort: "true", headerStyle: () =>{
        return{ width: "2%"};
    },
},
    {dataField: "noKtp", text: "No Ktp", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
    {dataField: "username", text: "User Name", sort: "true", headerStyle: () =>{
         return{ width: "8%"};
    },},
    {dataField: "name", text: "Name", sort: "true", headerStyle: () =>{
        return{ width: "8%"};
    },},
    {dataField: "gender", text: "Gender", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },},
    {dataField: "contact", text: "Contact", sort: "true", headerStyle: () =>{
        return{ width: "8%"};
    },},
    {dataField: "dateOfBirth", formatter: dateFormat, dateFormat, text: "Date Of Birth", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
   
    // {dataField: "createdBy", text: "Created By", sort: "true", headerStyle: () =>{
    //     return{ width: "5%"};
    // },},
    // {dataField: "updatedBy", text: "Updated By", sort: "true"},
    // {dataField: "deletedAt", text: "Deleted At", sort: "true"},
    {dataField: "createdAt", formatter: dateFormat, dateFormat, text: "Created At", sort: "true"},
    {dataField: "updatedAt", formatter: dateFormat, dateFormat, text: "Updated At", sort: "true"},
    {
        dataField: "",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={"/admin/detail-user/" + row.id}>
               <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faInfo} /> Detail</button>
              </Link>
              
    
              {/* <Link to={"/admin/edit-user/" + row.id}>
                  <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faEdit} /> Edit</button>
              </Link>     */}
             
             
            </div>
          );
        },
      },
];

const defaultSortedBy = [{
    dataField: "id",
    order: "asc" 
}];

useEffect(() => {
    getUsersData();
}, []);

  return (
    <div className="col main pt-5 mt-3">
    <div className="row ">
        <div className="col">
          <h5 className="mt-3 mb-3 text-secondary">
           All User
          </h5>
          <div className='container-fluid table-overflow'>
          {loading? (
           <>
        <BootstrapTable bootstrap4 style={{fontSize: "20px"}} defaultSorted={defaultSortedBy} keyField='id' data={users} columns={columns} pagination={paginationFactory()} striped />
        </> 
    ) : (
        <ReactBootstrap.Spinner animation='border' />
    )}
            </div>      
          
        </div>
        
    </div>
    
    
    

</div>
  )
}

export default DataUsers