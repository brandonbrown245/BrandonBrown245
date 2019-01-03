
const Discord = require('discord.js');
 
exports.run = (client, message , args , tools ,) => {
 
       if (message.channel.name !== 'register') return message.reply('You must Register your social club name in Register');


  const embed4 = new Discord.RichEmbed()
  .setDescription("**Now that you are registered, please be sure to read the rules and how to join. Other than that, enjoy your time in the server and do not be afraid to ask any questions you may have**")
  .setColor("#42f45c");
  message.author.send({embed: embed4});


  const embed3 = new Discord.RichEmbed()
  .setDescription("**The money Dropper Sc name is Batman_345 he will not add you it is up to you to add the money Dropper\n\nHow to join the money drop lobby\n\nWhen you register you will get the sc of the money dropper you have to add him when you did add him. he will add you when he start's a money drop then you just join his lobby just if he says he is doing a money drop**")
  .setColor("#42f45c");
  message.author.send({embed: embed3});
 
 
 
    let guild = message.guild;
    const cnl = client.channels.get('530067267791093761');
    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`)
    .addField('Social Club:', ` ${args}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("#42f45c");
      cnl.send({embed})
    .catch(e => logger.error(e))
    message.delete();

     let role = message.guild.roles.find(role => role.name === 'Registered');
    message.member.addRole(role);
    if (message.member.roles.has(role.id)) {
        let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setColor('#36393f')
            .setDescription('Your account has already been Registered!')
        return message.channel.send((verifyEmbed));
    } else {
        let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setColor('#36393f')
            .setDescription('Your account has been successfully Registered.')
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
    name: 'register',
    description: 'Register Your Sc Name',
    usage: '>register [SC Name]' 
  };
