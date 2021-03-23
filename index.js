const { Telegraf } = require('telegraf')
const {BOT_TOKEN} = require('./config')
const weather = require('weather-js')
const path = require('path')

const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('Привет! Напиши мне название города, а пришлю тебе Погоду в этом городе'))
bot.news((ctx) => ctx.reply('Ещё не готово! Скоро...'))
bot.time((ctx) => ctx.reply('Ещё не готово! Скоро...'))
bot.help((ctx) => {
    ctx.reply('Чё не можешь разобраться 😂 Пашёл нахуй')
    ctx.replyWithSticker('CAACAgIAAxkBAAECF9NgWcqqP49ls5bUKLL_sewYbzY3tgACDAMAArVx2gZOgc1a7F4a-x4E')
})
bot.on('sticker', (ctx) => {
    ctx.replyWithSticker('CAACAgIAAxkBAAECF9VgWcrgfKNg8GEBsKVTEqYQkkiUSgACJgMAArVx2gY-GQuL5xwZQB4E')
    ctx.reply('Классный стикер но нахуя он мне')
})

// bot.hears(helloMsg, (ctx) => ctx.reply('Приветсвую, чё надо?'))

bot.on('message', (ctx) => {
    switch(ctx.update.message.text) {
        case 'Привет':
        case 'Здравствуй':
        case 'Hello':
          ctx.reply('Приветсвую, чё надо?')
        break
        default:
            weather.find({search: ctx.update.message.text, degreeType: 'C'}, (err, result) => {
                if(err) console.log(err)
        
                if (result.length == 0){
                    ctx.reply('Ты чё уебан такого города нет??')
                }else{
                    ctx.reply('В городе ' + result[0].location.name + ' температура: ' + result[0].current.temperature)
                }
            })
          break
      }
})
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))