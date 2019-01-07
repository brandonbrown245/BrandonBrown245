const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const client = new Discord.Client();
bot.commands = new Discord.Collection();
let purple = botconfig.purple;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Gta Money Drop", {type: "WATCHING"});
     

});


bot.on("message", async message => {
  
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  
   bot.on("message", async message => {
        if (message.author.bot) return
        let modlogid = 530862540239011852 //Channel ID for Mod Log
        let modlog = message.guild.channels.get(modlogid)
        const profanities = require('profanities');
        let profEmbed = new Discord.RichEmbed()
            .setDescription(`User ${message.author}, has been caught swearing!\nUserID: ${message.author.id} - UserTag: ${message.author.tag}`)
        for (x = 0; x < profanities.length; x++) {
            if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
                // if (message.content == profanities)
                message.author.send(`Hinami Security, Swearing is not allowed here. Please refrain from swearing, ${message.author}`)
                modlog.send(profEmbed).catch(() => message.guild.owner(`Mod-log hasn't been configured, any discord profanity triggers will be sent directly to you.\n\`${message.content}\`\nBy User: ${message.author}\nBy UID: ${message.author.id}\nBy UserTag: ${message.author.tag}`))
                modlog.send(`\`Message Sent\`: ${message.content}`)
                message.delete();
                return;
            }
        }
    })
  
});
bot.login(process.env.token);
