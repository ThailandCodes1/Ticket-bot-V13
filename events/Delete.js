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
      .setColor("RED")
      .setDescription("Ticket will be deleted in a few seconds")
      
  if (interaction.customId === "delete") {
    let c = interaction.channel;
    await interaction.deferReply()
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
          value:`${c.name}`
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
       await db.delete(`ticket_${c.id}`)
      },4000))
    
   }
  }
})
