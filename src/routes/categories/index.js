const express = require('express')
const { getAllCategories } = require('../../controllers/ProductsController')


const categRoot = express.Router()

categRoot.get('/all',(req,res)=>{
    getAllCategories((data)=>{
        res.status(200).end(JSON.stringify(data))
    })
})

module.exports = categRoot