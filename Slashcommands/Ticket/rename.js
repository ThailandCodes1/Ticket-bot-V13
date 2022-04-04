const db = require("pro.db")
module.exports = {
  name:"rename",
  description:"✍️ rename the ticket",
  cooldown:15,
  options:[
    {
      name:"name",
      description:"New name of the ticket",
      type:"STRING",
      required:true
    },
  ],
  run : async(interaction, client,args ) => {
    await interaction.deferReply({ephemeral:false})

    let name = interaction.options.getString("name")

    let ch = interaction.channel

    let ticket = db.fetch(`ticket_${ch.id}`)

    if (!ticket) return interaction.editReply({content:"🤔 - This isn't a ticket"});

    await ch.setName(name)
    await interaction.editReply({content:`✅ Done`})
  }
}
