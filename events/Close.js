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
      
  if (interaction.customId === "cb") {
      await interaction.deferReply({})
      let yes = new MessageButton()
      .setStyle("DANGER")
      .setLabel("Close")
      .setCustomId("yes")

      let no = new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Cancel")
      .setCustomId("no")

      let row = new MessageActionRow()
      .addComponents([yes,no])

      await interaction.deleteReply()
    
      let m = await interaction.channel.send({content:"Are you sure you would like to close this ticket ?", components:[row]})

   // if (interaction.customId === "yes") {
      
   // } 
    
    }
    //no
    if (interaction.customId === "no") {
      interaction.message.delete()
    }
    //yes
    if (interaction.customId === "yes") {
      //channel
      let ch = interaction.channel
      //embed
      let embed = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`\`Support team ticket controls\``)
      //delete
      let d = new MessageButton()
      .setLabel(`Delete`)
      .setEmoji("⛔")
      .setStyle("SECONDARY")
      .setCustomId("delete")

      let t = new MessageButton()
      .setLabel(`Transcript`)
      .setEmoji("📑")
      .setStyle("SECONDARY")
      .setCustomId("transcript")

      let o = new MessageButton()
      .setLabel(`Open`)
      .setEmoji("🔓")
      .setStyle("SECONDARY")
      .setCustomId("reopen")

      let row = new MessageActionRow()
      .addComponents([t,o,d])

      let e = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(`Ticket Closed by ${interaction.user}`)
     await interaction.message.delete()
     
    let msg = await interaction.channel.send({embeds:[e]})
      
     await ch.permissionOverwrites.edit(ticket.ticketby,{
       VIEW_CHANNEL:false,
       SEND_MESSAGES:false,
     })
      
      
      
       ch.setName(`closed-${ticket.count}`)

      await ch.send({embeds:[embed], components:[row]})

      let member = client.users.cache.get(ticket.ticketby)
      let em = new MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Ticket Closed")
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
