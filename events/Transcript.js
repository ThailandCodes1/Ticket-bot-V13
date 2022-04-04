const client = require("../index.js")
const db = require("pro.db")

const { MessageEmbed, MessageButton , MessageActionRow } = require("discord.js") 
const {createTranscript} = require('discord-html-transcripts');
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
      let e = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`Ticket Saved by ${interaction.user}`)
    if (interaction.customId === "transcript") {
      await interaction.deferReply()
    let ch = interaction.channel;
    let member = client.users.cache.get(ticket.ticketby)
      
      await interaction.editReply({embeds:[e]})

      const file = await createTranscript(ch);

      let embed = new MessageEmbed()
      .setAuthor({
        name:member.tag, iconURL:member.displayAvatarURL({dynamic:true})
                 })
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
        .setFooter({
          text:"ThailandCodes © / Th | N A S S E R",
          iconURL: interaction.guild.iconURL({dynamic:true})
        })
        .setColor("#4453F5")
      .addFields(
        {
          name:"**Ticket Owner**",
          value:`<@${ticket.ticketby}>`
        },
        {
          name:"**Ticket Name**",
          value:`${ch.name}`,
        },
        {
          name:"**Action by**",
          value:`${interaction.user}`
        }
      )




if (log_c) {
        log.send({embeds:[embed],files:[file]})
}
     }
  }
})
    
