const {MessageEmbed, MessageButton} = require("discord.js")
const db = require("pro.db")
module.exports = {
  name:"add",
  description:"➕ Add member to the ticket",
  cooldown:15,
  options:[
    {
      name:"user",
      description:"The user to added",
      type:"USER",
      required:true
    },
  ],
  
  run : async(interaction, client, args) => {
    await interaction.deferReply()

    

    let user = interaction.options.getMember("user")

    if (user.user.id === interaction.user.id ) return interaction.editReply({content:"🤔 - You can't add yourself"});
    //Role_1
      let role1 = db.fetch(`role1_${interaction.guild.id}`)
      //Role_2
      let role2 = db.fetch(`role2_${interaction.guild.id}`)
      let ticket = await db.get(`ticket_${interaction.channel.id}`)

    if (role1 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``});

      if (role2 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})

    if (!interaction.member.roles.cache.some(role => (role.id === role1 || role.id === role2))) return interaction.editReply({content:`❌ You don't have role to use this command \`${n1.name}\` / \`${n2.name}\``});

    if (!ticket) return interaction.editReply({content:`🤔 - This isn't a ticket`});

    let log_c = db.fetch(`log_${interaction.guild.id}`)
    let log = interaction.guild.channels.cache.get(log_c) 

    let ch = interaction.channel;
      //embed
      let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`${user} added to ticket ${ch}`)

    
    
     

   await ch.permissionOverwrites.edit(user.user.id,{
     VIEW_CHANNEL:true,
     SEND_MESSAGES:true
   })

    await interaction.editReply({embeds:[embed]})

    
  }
}
