require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const { DiscordTogether } = require('discord-together')
client.discordTogether = new DiscordTogether(client)

client.once('ready', () => {
  console.log('準備完了！')
})

client.on('messageCreate', async (message) => {
  if (message.content === '!yt') {
    if (message.member.voice.channel) {
      client.discordTogether
        .createTogetherCode(message.member.voice.channel.id, 'youtube')
        .then(async (invite) => {
          await message.channel.send({
            components: [
              new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                  .setStyle('LINK')
                  .setURL(`${invite.code}`)
                  .setEmoji('▶️')
                  .setLabel('Youtube Togetherに参加')
              ),
            ],
            embeds: [
              new Discord.MessageEmbed()
                .setTitle('Youtube Together')
                .setDescription(
                  `Youtube Youtubeの新規セッションを作成しました！\n参加ボタンを押して始めましょう！\n\n[参加する](${invite.code})`
                )
                .setImage(
                  'https://www.neuf.tv/wp-content/uploads/2021/09/Discord-presente-Watch-Together-une-integration-YouTube-pour-regarder-des.jpg'
                )
                // .setURL(`${invite.code}`)
                // .addField("","")
                .setColor('RANDOM'),
            ],
          })
        })
    }
  }
})

client.login(process.env.TOKEN)
