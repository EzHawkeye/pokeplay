const discord = require("discord.js");

const SUGGESTION_CHANNEL = 738838962260672572;

module.exports.run = async (bot, message, args) => {

    if (message.channel.id === SUGGESTION_CHANNEL) {
        let embed = new Discord.RichEmbed()
        .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
        .setColor(0x2894C2)
        .setTitle('Suggestie')
        .setDescription(message.content)
        .setTimestamp(new Date());
        message.channel.send(embed).then((message) => {
          const sent = message;
          sent.react('✅').then(() => {
            sent.react('❌').then(() => {
              log(LOG_LEVELS.SPAM,'Completed suggestion message');
            }).catch(console.error);
          }).catch(console.error);
        }).catch(console.error);
        return message.delete();
    }
}

module.exports.help = {
    name: ""
}