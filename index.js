const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const client = new Discord.Client();
bot.commands = new Discord.Collection();
let purple = botconfig.purple;

fs.readdir("./commands/", (err, files) => {

  
  client.on('guildMemberAdd', member => {
    let addRole_newcomer = member.guild.roles.find(role => role.name == "Unregistered");
    console.log("\x1b[35m\x1b[1m[join]\x1b[0m " + member.user.tag);
    member.send("Hello! We are glad you joined our Cult! \nPlease read the rules in the #rules channel. You'll also find instructions on how to gain access to the server there.\n\nThanks and have fun! :)").then(m => {
        let URLembed = new Discord.RichEmbed()
            .setTitle("(Link to the #rules channel)")
        member.send(URLembed);
    });
    member.addRole(addRole_newcomer);
});

client.on("guildMemberRemove", member => {
    console.log("\x1b[31m\x1b[1m[leave]\x1b[0m " + member.user.tag);
    var botLogs = client.channels.find(channel => channel.id == "536570190054293524");
    return botLogs.send(`❌ \`${member.user.tag}\` has left the server`);
});
  
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
  
});
bot.login(process.env.token);
