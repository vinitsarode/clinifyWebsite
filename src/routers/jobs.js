const { response } = require('express')
const express = require('express')
const getJob = require('../api/jobsquare')
const shuffle = require('../utils/shuffle')

const router = new express.Router()

//Main Page
router.get('/jobs', async (req, res) => {
    try {
        var jobs = await getJob(undefined, undefined, undefined, 1, 10)

        for (var i = 0; i < jobs.items.length; i++) {
            var temp = ''
            for (var j = 0; j < jobs.items[i].locations.length && j != 4; j++) {
                if (!temp.includes(jobs.items[i].locations[j].cityName)) {
                    temp = temp + jobs.items[i].locations[j].cityName + '. '
                }
            }
            jobs.items[i].locations = temp
        }
        jobs.items = shuffle(jobs.items)

        res.render('jobs', { title: 'Jobs', jobs: jobs.items, headerSec: true })
    } catch (e) {
        res.status(404).send()
    }

})


router.post('/getjobs', async (req, res) => {
    try {
        //console.log(req.body.title, req.body.type, req.body.location)
        const jobs = await getJob(req.body.title, req.body.type, req.body.location, req.body.page, 15)
        //console.log(jobs.pagination)
        if (jobs.items) {
            for (var i = 0; i < jobs.items.length; i++) {
                var temp = ''
                for (var j = 0; j < jobs.items[i].locations.length && j != 4; j++) {
                    if (!temp.includes(jobs.items[i].locations[j].cityName)) {
                        temp = temp + jobs.items[i].locations[j].cityName + '. '
                    }
                }
                jobs.items[i].locations = temp
            }

            res.send({ items: jobs.items, pagination: jobs.pagination })
        } else {
            res.send({ error: "No results" })
        }

    } catch (e) {
        res.status(404).send()
    }

})





module.exports = router