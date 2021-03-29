const rp = require('request-promise')
const $ = require('cheerio')

const URL = 'https://24.kg'
const news = []

rp(URL)
  .then(function(html){
    //success!
    
    news.push({
      new: $('.one > .title > a > span', html).first().text().slice(),
      time: $('.time', html).first().text().slice(),
      href: URL + $('.one > .title > a' , html).attr('href')
    })
  console.log(news)

  })
  .catch(function(err){
    //handle error
  });