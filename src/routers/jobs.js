const express = require('express')
const getJob = require('../api/jobsquare')

const router = new express.Router()

//Main Page
router.get('/jobs', async (req, res) => {
    try {
        
        res.render('main', { title: 'Main', noheader: true, main: true, seating: admin.seating, tables: admin.tables, shelves: admin.shelves, storage: admin.storage, products })
    } catch (e) {
        res.status(404).send()
    }

})



module.exports = router