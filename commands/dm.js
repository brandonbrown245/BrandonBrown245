    
    const Discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");

    console.log("starting")
    bot.guilds.get(message.guild.id).members.forEach(member1 => {
      console.log(`DM'ed ${member1.user.tag}`)
      member1.send(`**Hello ${member1.user.tag} I Am Just Messaging You Abount The New Shop\nIf You Didnt See We Have Made A Shop Where You Can Now Buy Money Drop For Gta 5 Online\nThe Selly Link Is : https://selly.gg/u/Gta5MoneyDrop**`)
    });
    }
module.exports.help = {
    name:"dm"
  }
