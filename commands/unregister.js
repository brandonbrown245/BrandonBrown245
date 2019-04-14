const Discord = require('discord.js');
 
exports.run = (client, message , args , tools ,) => {
 
       if (message.channel.name !== 'unregister') return message.reply('**You must Unregister in the unregister chat**');


    message.delete();

    let role = message.guild.roles.find(role => role.name === 'Unregistered');
    message.member.addRole(role);

    let removerole = message.guild.roles.find(role => role.name === 'Registered');
    message.member.removeRole(removerole);
   
    if (message.member.roles.has(role.id)) {

        let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setColor('#36393f')
            .setDescription('**Your account has already been Unregistered!**')
        return message.channel.send((verifyEmbed));
    } else {
        let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setColor('#36393f')
            .setDescription('Your account has been successfully Unregistered.')
        return message.channel.send((verifyEmbed));
    }
    
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""],
    permLevel: ""
  };

  exports.help = {
    name: 'unregister',
    description: 'Unregister Your Sc Name',
    usage: '>unregister' 
  };
