// const { Telegraf } = require('telegraf');
// const { Markup } = require('telegraf');
// const bot = new Telegraf('') //сюда помещается токен, который дал botFather

// bot.command('hello', (ctx) => ctx.reply('Hello'))
// bot.command('modern', ({ reply }) => reply('Yo'))
// bot.command('hipster', Telegraf.reply('λ'))
// bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
// bot.on('sticker', (ctx) => ctx.reply('ha ha ha')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
// bot.launch() // запуск бота

const Telegraf = require('telegraf');
const { Markup } = Telegraf;
const bot = new Telegraf('')

const inlineMessageRatingKeyboard = Markup.inlineKeyboard([ // add like or dislike online button
    [Markup.callbackButton('👍', 'like')],
    [Markup.callbackButton('👎', 'dislike')]
]).extra()

let players = [];

// bot.hears(/start/i, (ctx) => {
//     ctx.reply('❓⚽🏃🏻‍♂️ 🏃🏻‍♂️ How many players are you have?',
//         Markup.inlineKeyboard([
//             [Markup.callbackButton('8', 'eight'),
//             Markup.callbackButton('9', 'nine'),
//             Markup.callbackButton('10', 'ten'),
//             Markup.callbackButton('11', 'eleven'),
//             Markup.callbackButton('12', 'twelve'),
//             ],
//             [Markup.callbackButton('13! Incredible', 'thirteen')],
//             [Markup.callbackButton('14!! Oh my God!', 'fourteen')],
//         ]).extra()
//     )
// });
const startAndHelp = (ctx) => {
    ctx.reply('Hi ' + ctx.update.message.from.first_name + '! \n\n' +
        'Этот бот умеет делить на 2 команды введенных игроков \n');
    
    ctx.reply(
        //ctx.from.id,
        '❓ Хочешь собрать команду?',
        Markup.inlineKeyboard([
            [Markup.callbackButton('Да', 'yes'), Markup.callbackButton('Нет', 'no')],
        ]).extra()
    )
}

bot.hears(/start/i, (ctx) => {
    startAndHelp(ctx);
})

bot.hears(/help/i, (ctx) => {
    ctx.telegram.sendMessage(
        ctx.from.id,
        'Here are some commands you can try:\n\n' +
        '🤓 /help - helps command \n' +
        '⚽ /team - add your team\n' +
        '💪 /batya - add Batya\n' +
        '😎 /hack - hack game and to know how to be the best\n'
    )
})


const addPlayers = (data) => {
    players.push(data);
    console.log(players)
}


// bot.action('/start', (ctx) => {
//     bot.start((ctx) => {
//         startAndHelp(ctx);
//     })
// })


bot.action('no', (ctx) => ctx.telegram.sendMessage(
    ctx.from.id,
    'Here are some commands you can try:\n\n' +
    '🤓 /help - helps command \n' +
    '⚽ /team - add your team\n' +
    '💪 /batya - add Batya\n' +
    '😎 /hack - hack game and to know how to be the best\n'
))

bot.action('yes', (ctx) => ctx.telegram.sendMessage(
    ctx.from.id,
    'Введи всех игрочишек через запятую (,) за один раз'
))


bot.on('text', (ctx) => {   
        ctx.telegram.sendMessage(
            ctx.from.id,
            '❓ Все игроки внесены?',
            Markup.inlineKeyboard([
                [
                    Markup.callbackButton('Да! давай крути уже!', 'all_players'),
                    Markup.callbackButton('Нет! забыл добавить', 'not_all_players')
                ],
            ]).extra()
        )
})



// bot.action('all_players', (ctx) => {
//     console.log(ctx.answerInlineQuery)
// })



bot.start((ctx) => {
    startAndHelp(ctx);
})



bot.on('callback_query', (ctx) => {
    const query = ctx.update.callback_query.data;
    console.log(ctx.update)
})




// bot.hears(/batya/i, (ctx) => {
//     ctx.replyWithPhoto({ source: './assets/hack-game.jpg' })
// })
// function aaa(ctx) {
//     const keyboard = [
//         [{ text: '7' }, { text: '8' }, { text: '9' }],
//         // ['4', '5', '6'],
//         // ['1', '2', '3'],
//         // ['0']
//     ];

//     ctx.telegram.sendMessage(
//         ctx.from.id,
//         'This bot get random teams from players. How many players are you have?', {
//         reply_markup: {
//             keyboard: [
//                 keyboard
//             ],
//             resize_keyboard: true
//         }
//     }
//     )

// }


// setTimeout(function () {
//     ctx.reply('Here are some commands you can try:\n\n' +
//         '🤓 /help - helps command \n' +
//         '⚽ /team - add your team\n' +
//         '💪 /batya - add Batya\n' +
//         '😎 /hack - hack game and to know how to be the best\n'
//     )
// }, 1000)
// bot.command('justfun', (ctx) => 
//ctx.telegram.sendMessage(
//     ctx.from.id,
//     'This bot get random teams from players. How many players are you have?', {
//         reply_markup: {
//             keyboard: [
//                 [{ text: '1' }, { text: '2' }]
//             ],
//             resize_keyboard: true
//         }
//     }
// )
//)

bot.action('like', (ctx) => ctx.editMessageText('🎉 Awesome! 🎉'))
bot.action('dislike', (ctx) => ctx.editMessageText('okey'))

bot.startPolling()