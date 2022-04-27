//Solution for Assessment: Part Two, Question B

//TO USE: type 'node script.js' in the command line followed by a space and one of the Nobel Prize categories to access the winner of that category and their motivation for the award from a randomly selected year between last year and 1901. For example: node script.js Chemistry
//The acceptable categories are: Literature, Physics, Chemistry, Medicine, Peace, and Econmics

const https = require('https')

let category = process.argv.slice(2)
let catSubStr = category.toString().toLowerCase().substring(0,3); 

let currentYear = new Date().getFullYear()
let yearRange = currentYear - 1902
let randomYear = (Math.floor(Math.random() * yearRange)) + 1901

function getQuote() {
    const options = {
        hostname: "api.nobelprize.org",
        path: `/2.1/nobelPrize/${catSubStr}/${randomYear}`,
        method: 'GET'
    }
    const req = https.request(options, res => {
        let body = ""

        res.on('data', chunk => {
            body += chunk
        })

        res.on('end', _ => {
            let data = JSON.parse(body)
            console.log(`The ${randomYear} Nobel Prize winner for ${category}:`)
            console.log('Name: ' + data[0].laureates[0].fullName.en)
            console.log('Motivation for award: ' + data[0].laureates[0].motivation.en)
        })
    })

    req.on('error', error => {
        console.error(error);
      });
      
    req.end();
}

getQuote()