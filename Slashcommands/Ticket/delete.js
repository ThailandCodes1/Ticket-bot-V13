const db = require("pro.db")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name:"delete",
  description:"⛔ Delete the ticket",
  cooldown:15,

  run : async(interaction, client, args) => {
    
  await interaction.deferReply()
  


  let role1 = db.fetch(`role1_${interaction.guild.id}`)
    let role2 = db.fetch(`role2_${interaction.guild.id}`)
    let ticket = db.fetch(`ticket_${interaction.channel.id}`)

    let n1 = interaction.guild.roles.cache.get(role1)
    let n2 = interaction.guild.roles.cache.get(role2)

    let ch = interaction.channel;

    let log_c = db.fetch(`log_${interaction.guild.id}`)
    let log = interaction.guild.channels.cache.get(log_c)

    if (role1 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``});

      if (role2 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})
    
    if (!interaction.member.roles.cache.some(role => (role.id === role1 || role.id === role2))) return interaction.editReply({content:`❌ You don't have role to use this command \`${n1.name}\` / \`${n2.name}\``});

    if (!ticket) return interaction.editReply({content:`🤔 - This isn't a ticket`});

 
      //embed
      let embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("Ticket will be deleted in a few seconds")
      
  
    
    
    await interaction.editReply({embeds:[embed]}).then(async() => 
      setTimeout(async() => {
       await interaction.channel.delete()
      let member = client.users.cache.get(ticket.ticketby)
      let em = new MessageEmbed()
      .setColor("RED")
      .setTitle("Ticket Deleted")
      .setAuthor({
        name: member.tag, iconURL: member.displayAvatarURL({dynamic:true})
                 })
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
        .setFooter({
          text:"ThailandCodes © / Th | N A S S E R",
          iconURL: interaction.guild.iconURL({dynamic:true})
          
        })
      .addFields(
        {
          name:"**Ticket**",
          value:`${ch.name}`
        },
        {
          name:`**Ticket Owner**`,
          value:`${member}`
        },
        {
          name:`**Action by**`,
          value:`${interaction.user}`
        }
      )
      if (log) {
       await log.send({embeds:[em]})
      }
       await db.delete(`ticket_${ch.id}`)
      },4000))
    
   }
}
