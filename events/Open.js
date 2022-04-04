const client = require("../index.js")
const db = require("pro.db")
const { MessageEmbed, MessageButton , MessageActionRow } = require("discord.js") 
client.on("interactionCreate", async interaction => {
  
  if(interaction.isButton()) {
      //Role_1
      let role1 = db.fetch(`role1_${interaction.guild.id}`)
      //Role_2
      let role2 = db.fetch(`role2_${interaction.guild.id}`)
      let ticket = await db.get(`ticket_${interaction.channel.id}`)

    let log_c = db.fetch(`log_${interaction.guild.id}`)
    let log = interaction.guild.channels.cache.get(log_c) 
      
      //embed
      let embed = new MessageEmbed()
    .setColor("BLACK")
    .setDescription(`Ticket Opened by ${interaction.user}`)

    if (interaction.customId === "reopen") {
    let ch = interaction.channel;
     await interaction.message.delete()

   await ch.permissionOverwrites.edit(ticket.ticketby,{
     VIEW_CHANNEL:true,
     SEND_MESSAGES:true
   })

     ch.setName(`ticket-${ticket.count}`)
     await ch.send({embeds:[embed]})

      let member = client.users.cache.get(ticket.ticketby)
      let em = new MessageEmbed()
      .setColor("BLACK")
      .setTitle("Ticket Reopened")
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
          value:`${ch}`
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
        log.send({embeds:[em]})
      }
    }

  }
})
          
