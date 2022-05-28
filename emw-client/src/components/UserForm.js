import Input from "./Input"
import useForm from "../hooks/useForm"
import Button from "./Button"
import Axios from "axios"
import { useState } from "react"
import { Modal } from 'react-bootstrap';
import { useEffect } from "react"
import './UserForm.css'
import { Alert } from "bootstrap"



const UserForm = ({ employee, formName, show, setShow, getEmployees }) => {
    var id /*= employee.emp_id*/
    var isEmailValid
    var email_err_p = document.getElementById('email_err')
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    const [name, setName] = useState([])
    const [lastname, setLastname] = useState([])
    const [email, setEmail] = useState([])

    const updatedEmployee = {id, name: name, lastname: lastname, email: email}

    const addEmployee = () => {
        if(email.length>0){
            if(!regex.test(email)) {
                isEmailValid = false
                email_err_p.style.display = 'block'
            } else {
                isEmailValid = true
                email_err_p.style.display = 'none'
            }
        }

        
        if(name.length<=0 || lastname.length<=0 || email.length<=0) {
            alert('There are missing fields')
        } 
        if(isEmailValid && (name.length>0 && lastname.length>0 && email.length>0)){
            Axios.post('http://localhost:3000/addEmployee', updatedEmployee)
            .then((() => {
                console.log('success')
                // getEmployees()
                setShow(false)
                setName('')
                setLastname('')
                setEmail('')
            }))
            
        }
        
        
    }

    const updateEmployee = () => {
        if(email.length>0){
            if(!regex.test(email)) {
                isEmailValid = false
                email_err_p.style.display = 'block'
            } else {
                isEmailValid = true
                email_err_p.style.display = 'none'
            }
        }
        
        if(name.length<=0 || lastname.length<=0 || email.length<=0) {
            alert('There are missing fields')
        } 
        if(isEmailValid && (name.length>0 && lastname.length>0 && email.length>0)) {
            Axios.put(`http://localhost:3000/updateEmployee/${employee.emp_id}`, updatedEmployee)
            .then((() => {
                console.log('success')
                getEmployees()
                setShow(false)
                setName('')
                setLastname('')
                setEmail('')
            }))
            
        }
    }

    const handleClose = () => setShow(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        addEmployee()
    }

    useEffect(()=>{
        if(employee) {
            setName(employee.emp_name)
            // setLastname(employee.lastname)
            // setEmail(employee.email)
        }
        
    },[])

    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title><h1>{formName}</h1></Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Input 
                        label="First Name" 
                        name="name" 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='First Name' 
                        
                        
                    />
                    <Input 
                        label="Last Name" 
                        name="lastname" 
                        value={lastname}
                        onChange={(e)=> setLastname(e.target.value)}
                        placeholder='Last Name'
                    />
                    <Input 
                        label="Email" 
                        name="email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Email'
                    />
                    <p id="email_err"> * Please enter a valid Email</p>
                    
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={!employee ? addEmployee : updateEmployee}>Submit</Button>
            <Button id="cancelBtn" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    
}

export default UserForm
