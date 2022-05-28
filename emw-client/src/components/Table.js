import Axios from "axios"
import React, { useState, useEffect } from "react"
import './Table.css'
import Button from './Button'
import UserForm from "../components/UserForm";
import DeleteModal from "../components/DeleteModal"
import { Form } from "react-bootstrap";
import App from "../App";

const Table = ({ children }) => {

    var employeesSelected = []
    const [employee, setEmployee] = useState([])
    const [employees, setEmployees] = useState([])
    const [deleteEmployees, setDeleteEmployees] = useState([])

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [showDelete, setShowDelete, n_employees] = useState(false);
    const handleShowDelete = () => setShowDelete(true);

    const [formName, setFormName] = useState([]);
    const [searchName, setSearchName] = useState([]);

    useEffect(()=>{
        getEmployees()
    },[])

    const getEmployees = () => {
        Axios.get('http://localhost:3000/getEmployees').then((response) => {
            if(response.statusText === "OK"){
                if(response.data && response.data.length > 0){
                    setEmployees(response.data)
                }
            }
        })
    }

    const getEmployeesByName = () => {
        if(searchName.length > 0) {
            Axios.get(`http://localhost:3000/getEmployeesByName/${searchName}`).then((response) => {
                if(response.statusText === "OK"){
                    if(response.data && response.data.length > 0){
                        setEmployees(response.data)
                        console.log(employees)
                    } else {
                        setEmployees([])
                    }
                }
            })
            
        } else {
            getEmployees()
        }
    }
    
    return (
        <div>
            <div id="searchDiv">
                <Form.Label htmlFor="search"></Form.Label>
                <Form.Control
                    type="search"
                    id="inputEmployees"
                    placeholder="Search Employees"
                    onChange={(e)=> setSearchName(e.target.value)}
                />
                <Button 
                    id="searchBtn"
                    onClick={() => {
                        getEmployeesByName()
                    }}
                >🔎
                </Button>    
            </div>
            <div id="tableWrapper">
                <table id="empTable" className="Table" cellPadding={5} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th> 
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => ( 
                        <tr key={emp.emp_id}>
                            <td>{emp.name}</td>
                            <td>{emp.emp_email}</td>
                            <td id="actions">
                            <Button 
                                id="editBtn"
                                onClick={() => {
                                    setEmployee(emp)
                                    handleShow()
                                    setFormName('Edit Employee')
                                }}
                            >✏️
                            </Button> 
                            
                            <Button 
                                id="deleteBtn"
                                onClick={() => {
                                    setEmployee(emp)
                                    handleShowDelete()
                                }}
                            >🗑️
                            </Button>
                            <label className="container">
                                <input 
                                onClick={()=> {
                                    if(employeesSelected.indexOf(emp) < 0){
                                        employeesSelected.push(emp)
                                        // console.log(employeesSelected)
                                    } else {
                                        employeesSelected.splice(employeesSelected.indexOf(emp), 1)
                                        // console.log(employeesSelected)
                                    }
                                    // setDeleteEmployees(employeesSelected)
                                    console.log(deleteEmployees)
                                }} 
                                type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>`
            </div>
            <UserForm employee={employee} formName={formName} show={show} setShow={setShow} getEmployees={getEmployees}/>
            <DeleteModal mode={'deleteEmployee'} employee={employee} employees={employeesSelected} setEmployees={setDeleteEmployees} showDelete={showDelete} setShowDelete={setShowDelete} getEmployees={getEmployees}/>
        </div>
        
    )
} 

export default Table