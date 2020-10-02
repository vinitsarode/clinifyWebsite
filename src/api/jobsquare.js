var axios = require('axios');

const getJob = async (title, jobType, location, pageNumber, pageSize) => {
    var titlefilter =''
    var jobtypefilter = ''
    var locationfilter = ''
    if(title){
        titlefilter = {
            field: "title",
            value:  title 

        }
    }
    if(jobType){
        jobtypefilter = {
            field: "jobType",
            values: [jobType] //["Full Time / Part Time / Work From Home / Internship"]
        }
    }
    // if(company){
    //     var titlefilter = `"value": "{${title}}"`
    // }
    if(location){
        locationfilter =  {
            "field":"location",
            "Value":`{${location}}`
        }
    }
    const obj = {
        partnerId: "CLINIFY",
        pagination: {
            pageNumber,
            pageSize
        },
        "filters": [   
            titlefilter,
            jobtypefilter,
            locationfilter
            // {
            //     "field": "company",
            //     "value": "{WebBee Global}" //{keyword}
            // },
            // {
            //     "field":"location",
            //     "Value":"{Maharashtra}"
            // }
            
        ]
    }
    console.log(obj)

    const response = await axios.post('https://bsm8fqj8ug.execute-api.ap-south-1.amazonaws.com/v3/job/external-search',obj )
    return response.data
}

// getJob("front end", "Full Time", "maharashtra", 1, 10).then((data) => {
//     console.log(data)
//     console.log(data.items[9].locations)
// }).catch((e) => {
//     //console.log(e)
// })

module.exports = getJob



