const express = require('express')
const cors = require('cors')
const router = express.Router()
const app = express()
const mysqlConnection = require('../database')

router.use(cors())

router.get('/getEmployees', (req, res) => {
    mysqlConnection.query("SELECT emp_id, CONCAT(emp_firstname, ' ', emp_lastname) as name, emp_email from employees", (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    })
})

router.get('/getEmployees/:id', (req, res) => {
    const { id } = req.params

    mysqlConnection.query('SELECT emp_id, CONCAT(emp_firstname, " ", emp_lastname) as name, emp_email from employees WHERE emp_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    })
})

router.get('/getEmployeesByName/:name', (req, res) => {
    const { name } = req.params
    console.log(name)
    mysqlConnection.query(`SELECT emp_id, CONCAT(emp_firstname, " ", emp_lastname) as name, emp_email from employees WHERE emp_firstname LIKE "%${name}%" OR emp_lastname LIKE "%${name}%"`, (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    })
    console.log(`SELECT emp_id, CONCAT(emp_firstname, " ", emp_lastname) as name, emp_email from employees WHERE emp_firstname LIKE "%${name}%" OR emp_lastname LIKE "%${name}%"`);
})

router.post('/addEmployee', (req, res) => {
    const { name, lastname, email } = req.body;
    console.log(req.body)
    mysqlConnection.query('INSERT INTO employees (emp_firstname, emp_lastname, emp_email) VALUES (?, ?, ?)', [name, lastname, email], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee has been saved'})
        } else {
            console.log(err)
        }
    })
})

router.put('/updateEmployee/:id', (req, res) => {
    const { name, lastname, email } = req.body;
    const { id } = req.params
    mysqlConnection.query('UPDATE employees SET emp_firstname = ?, emp_lastname = ?, emp_email = ? WHERE emp_id = ?', [name, lastname, email, id], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee has been updated'})
        } else {
            console.log(err)
        }
    })
})

router.delete('/deleteEmployee/:id', (req, res) => {
    const { id } = req.params
    mysqlConnection.query('DELETE FROM employees WHERE emp_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee has been deleted'})
        } else {
            console.log(err)
        }
    })
})

router.delete('/deleteEmployees', (req, res) => {
    const { ids } = req.params
    console.log(ids)
    // mysqlConnection.query('DELETE FROM employees WHERE emp_id IN', [ids], (err, rows, fields) => {
    //     if(!err) {
    //         res.json({Status: 'Employee has been deleted'})
    //     } else {
    //         console.log(err)
    //     }
    // })
})

module.exports = router