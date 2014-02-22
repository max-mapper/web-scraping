var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var page = "https://eoakland.oaklandnet.com/OA_HTML/OA.jsp?OAFunc=PON_ABSTRACT_PAGE"

var options = {
  rejectUnauthorized: false,
  url: page
}
request(options, gotPage)

function gotPage(error, response, html) {
  if (error) console.log(error)
  
  console.log("Status Code:", response.statusCode)
  
  // instead of console.log'ing the html, pass the html into the
  // getInfo function:
  getInfo(html)
}


function getInfo(html) {
  var $ = cheerio.load(html)
  // get all rows
  var contracts = $('.x1h tr')
  
  // cleanup: remove all <script> tags from the table (so they dont show up in our data)
  contracts.find('script').remove()
  
  // the first tr is the header row
  var headers = contracts[0]
  
  // get only the <th> elements from the header row
  var headers = $(headers).find('th')
  
  // remove the header row from our contracts array
  contracts = contracts.slice(1)
  
  // to store our data objects that we are about to create
  var dataArray = []
  
  // loop over each row, tdEl stands for <td> element
  contracts.each(function(num, tdEl) {
    var cells = $(tdEl).find('td')
    var data = {}
    
    // loop over each header, thEl stands for <th> element
    headers.each(function(num, thEl) {
      var headerText = $(thEl).text()
      var cellText = $(cells[num]).find('span').text()
      data[headerText] = cellText
    })
    
    // add the current object to the data array
    dataArray.push(data)
  })
  
  // now that we're done, pass the data array to saveInfo
  saveInfo(dataArray)
}

function saveInfo(dataArray) {
  console.log(dataArray)
}