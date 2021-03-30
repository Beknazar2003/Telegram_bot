const { Telegraf } = require('telegraf')
const {BOT_TOKEN} = require('./config')
const weather = require('weather-js')

const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('Привет! Напиши мне название города, а пришлю тебе Погоду в этом городе'))
bot.command('news', (ctx) => {
    const rp = require('request-promise')
    const $ = require('cheerio')

    const URL = 'https://24.kg'
    const news = []

    rp(URL)
    .then(function(html){
        //success!
        
        news.push({
        new: $('.title > a > span', html).first().text().slice(),
        time: $('.time', html).first().text().slice(),
        href: URL + $('.one > .title > a' , html).attr('href')
        })
        ctx.reply(news[0].time + ' ' + news[0].new + ' ' + news[0].href)
    })
    .catch(function(err){
        //handle error
    });
})
bot.command('time', (ctx) => {
    const now = new Date()
    ctx.reply(now.getHours() + ':' + now.getMinutes())
})
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
            weather.find({search: ctx.update.message.text, degreeType: 'C'}, async (err, result) => {
                if(err) console.log(err)
                console.log(result)
                if (result[0]){
                    await ctx.reply('В городе ' + result[0].location.name + ' температура: ' + result[0].current.temperature)
                    await ctx.reply('Погода: ' + result[0].current.skytext)
                    if(result[0].current.temperature <= 0){
                        await ctx.reply('Ебать дубео! Оденься как танк. И не забудь шапку(не будь далбаёбом)')
                    }
                    if(result[0].current.temperature <= 14 && result[0].current.temperature >= 1){
                        await ctx.reply('Прохладненько! Оденься потеплее.')
                    }
                    if(result[0].current.temperature <= 20 && result[0].current.temperature >= 15){
                        await tx.reply('Норм! Можно сказать идеальная погода! Оденься как хочешь')
                    }
                    if(result[0].current.temperature > 20){
                        await ctx.reply('Пздц жарища! Одень что угодно.')
                    }
                }else{
                    ctx.reply('Ты чё уебан такого города нет??')
                    
                }
            })
          break
      }
})
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))