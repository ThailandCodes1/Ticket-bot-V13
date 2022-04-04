const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js") 
const db = require("pro.db")
module.exports = {
  name:"send_panel",
  description:"send panel of tickets",
  cooldown:15,
  userPerms:["MANAGE_GUILD"],
  options:[
    {
      name:"title",
      description:"title of the embed",
      type: "STRING",
    },
    {
      name:"description",
      description:"description of the embed",
      type: "STRING",
    },
    {
      name:"color",
      description:"color of the embed [hex]",
      type: "STRING",
    },
    {
      name:"footer",
      description:"footer of the embed",
      type: "STRING",
    },
    {
      name:"image",
      description:"image of the embed [url]",
      type: "STRING",
    },
  ],
  run : async(interaction, client, args) => {
    try {
      await interaction.deferReply({ephemeral:true})

      let title = interaction.options.getString("title")

      let desc = interaction.options.getString("description")

      let color = interaction.options.getString("color")

      let footer = interaction.options.getString("footer")

      let image = interaction.options.getString("image")

      if (!title) title = "Tickets Support";

      if (!desc) desc = "To create ticket, please click on the button";

      if (!color) color = "#4453F5";

      if (!footer) footer = "ThailandCodes © / Th | N A S S E R ♕︎";

      if (!image) image = "https://images-ext-2.discordapp.net/external/38nfU6EsDbOc5nrEOByU1SMyy6kzVnMCcXaqsxABO2Q/%3Fsize%3D4096/https/cdn.discordapp.com/banners/781805600727105567/1e4f634085746b140f950651d2934358.webp";


      let role1 = db.fetch(`role1_${interaction.guild.id}`)
    let role2 = db.fetch(`role2_${interaction.guild.id}`)

      
let cy = db.fetch(`cy_${interaction.guild.id}`)
      if (cy == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})

    
    if (role1 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``});

      if (role2 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})
    

      let embed = new MessageEmbed()
      .setColor(color)
      .setFooter({text:footer})
      .setTitle(title)
      .setImage(image)
      .setDescription(desc)

      let but = new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("ot")
      .setEmoji("📩")
      .setLabel("Open Ticket")

      let row = new MessageActionRow()
      .addComponents([but])

      await interaction.editReply({content:"✅ Done"})
      await interaction.channel.send({embeds:[embed], components:[row]})
    } catch (err) {
      console.log(err)
      interaction.editReply({content:"❗ Error"})
    }
  }
}
