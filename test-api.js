const TelegramBot = require('node-telegram-bot-api')
const weather = require('weather-js')
const {BOT_TOKEN} = require('./config')

const token = BOT_TOKEN

const bot = new TelegramBot(token, {polling: true})


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Привет напиши мне название города!");
        
    });

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  weather.find({search: msg.text, degreeType: 'C'}, (err, result) => {
    if(err) console.log(err)

    if (result.length == 0){
        bot.sendMessage(chatId, 'Ты чё уебан такого города нет??')
    }else{
        bot.sendMessage(chatId, 'В городе ' + result[0].location.name + ' температура: ' + result[0].current.temperature)
    }
  })
})