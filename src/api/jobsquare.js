var axios = require('axios');

const getJob = async () => {
    const response = await axios.post('https://bsm8fqj8ug.execute-api.ap-south-1.amazonaws.com/v3/job/external-search', {
        "partnerId": "CLINIFY",
        "pagination": {
            "pageNumber": 2,
            "pageSize": 10
        },
        "filters": [
            // {
            //     "field": "title",
            //     "value": "{software developer}"
            // },
            // {
            //     "field": "jobType",
            //     "values": ["Full Time"] //["Full Time / Part Time / Work From Home / Internship"]
            // },
            // {
            //     "field": "company",
            //     "value": "{WebBee Global}" //{keyword}
            // },
            // {
            //     "field": "location",
            //     "Value": "{bangalore}" //{area / city / state}
            // }
        ]
    })
    return response.data
}

// getJob().then((data) => {
//     console.log(data)
// }).catch((e) => {
//     console.log(e)
// })

module.exports = getJob



