const express = require('express')
const getJob = require('../api/jobsquare')

const router = new express.Router()

//Main Page
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await getJob()
        console.log(jobs)
        for(var i=0; i< 10;i++){
            var temp =''
            console.log(jobs.items[i].locations)
            for(var j=0; j<jobs.items[i].locations.length && j!=4; j++){
                if(!temp.includes(jobs.items[i].locations[j].cityName)){
                    temp = temp + jobs.items[i].locations[j].cityName + '. '
                }
            }
            jobs.items[i].locations = temp
        }
        
        res.render('jobs', { title: 'Jobs', jobs:jobs.items})
    } catch (e) {
        res.status(404).send()
    }

})



module.exports = router