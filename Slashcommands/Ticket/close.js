
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const db = require("pro.db")
module.exports = {
  name:"close",
  description:"🔒 close the ticket",
  cooldown:1,

  run : async(interaction, client, args) => {
    await interaction.deferReply()

    let role1 = db.fetch(`role1_${interaction.guild.id}`)
    let role2 = db.fetch(`role2_${interaction.guild.id}`)
    let ticket = db.fetch(`ticket_${interaction.channel.id}`)

    let n1 = interaction.guild.roles.cache.get(role1)
    let n2 = interaction.guild.roles.cache.get(role2)

    let ch = interaction.channel;

    if (role1 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``});

      if (role2 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})
    
    if (!interaction.member.roles.cache.some(role => (role.id === role1 || role.id === role2))) return interaction.editReply({content:`❌ You don't have role to use this command \`${n1.name}\` / \`${n2.name}\``});

    if (!ticket) return interaction.editReply({content:`🤔 - This isn't a ticket`});

    //
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
    
      await interaction.channel.send({content:"Are you sure you would like to close this ticket ?", components:[row]})


    
  
    
  } 
}
