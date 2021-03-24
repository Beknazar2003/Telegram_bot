const rp = require('request-promise')
const $ = require('cheerio')

const URL = 'https://24.kg/'
const news = []

rp(URL)
  .then(function(html){
    //success!
    
    news.push({
      new: $('.title > a > span', html).first().text().slice(),
      time: $('.time', html).first().text().slice()
    })

  })
  .catch(function(err){
    //handle error
  });