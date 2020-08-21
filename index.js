const Discord = require("discord.js");
const botConfig = require("./botconfig.json");

const SUGGESTION_CHANNEL = '746428338255560784'
const SUGGESTION_CHANNELL = '746432337557979297'

Discord.RichEmbed = Discord.MessageEmbed;


const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }
 
    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De kanker file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`BOOMMM ${bot.user.username} is online!`);

    bot.user.setActivity("🛠️ PokéPlay", { type: "PLAYING" });

})

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;
    
    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);

    if (message.channel.id === SUGGESTION_CHANNEL) {
        let embed = new Discord.RichEmbed()
        .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
        .setColor(1146986)
        .setTitle('PokéPlay Suggestions')
        .setDescription(message.content)
        .setTimestamp(new Date);
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

      if (message.channel.id === SUGGESTION_CHANNELL) {
        let embed = new Discord.RichEmbed()
        .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
        .setColor(1146986)
        .setTitle('Discord Suggestions')
        .setDescription(message.content)
        .setTimestamp(new Date);
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

}); 



bot.login(process.env.token);