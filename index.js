var request = require('request')
var cheerio = require('cheerio')

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
  
  // remove the first row from our list since it's the header row
  contracts = contracts.slice(1)
  
  // loop over each row
  contracts.each(function(num, elem) {
    var cells = $(elem).find('td')
    console.log($(cells[0]).text())
  })
}