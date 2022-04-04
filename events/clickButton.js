const client = require("../index.js")
const db = require("pro.db")
const { MessageEmbed, MessageButton , MessageActionRow } = require("discord.js") 
client.on("interactionCreate", async interaction => {
  
  if(interaction.isButton()) {
  
    if (interaction.customId === "ot") {
      await interaction.deferReply({ephemeral:true})
      //Role_1
      let role1 = db.fetch(`role1_${interaction.guild.id}`)
      //Role_2
      let role2 = db.fetch(`role2_${interaction.guild.id}`)
      //category
      let cy = db.fetch(`cy_${interaction.guild.id}`)

      let log_c = db.fetch(`log_${interaction.guild.id}`)
      let log = interaction.guild.channels.cache.get(log_c)
      let black = db.fetch(`black_${interaction.user.id}`)
      //embed
      let embed = new MessageEmbed()
      .setColor("#4453F5")
      .setDescription("Support will be with you shortly.\nTo close this ticket click on button 🔒")
      .setFooter({
        text:"ThailandCodes © / Th | N A S S E R ♕︎", 
        iconURL:client.user.displayAvatarURL()
                 })

      let closebut = new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Close")
      .setEmoji("🔒")
      .setCustomId("cb")

      let row = new MessageActionRow()
      .addComponents([closebut])
      
      
      if (role1 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``});

      if (role2 == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})

      if (cy == null) return interaction.editReply({content:`> ❌ You need to setup tickets first by use \`/setup_tickets\``})


      await db.add(`counts_${interaction.message.id}`, 1)
     //count
      let count = await db.get(`counts_${interaction.message.id}`);
      
      await interaction.editReply({content:"Creating Ticket, Please wait..."})

      if (interaction.user.id === black) return interaction.editReply({content:"❌ You're in blacklist so you can't open ticket"})
        
      await interaction.guild.channels.create(`ticket-${count}`, {
  type: 'GUILD_TEXT',
  parent:cy,
        permissionOverwrites:[
          {
       id: interaction.user.id,
       allow: ["SEND_MESSAGES","VIEW_CHANNEL"],
    },
    {
      id: client.user.id,
      allow:["VIEW_CHANNEL","SEND_MESSAGES","MANAGE_CHANNELS","EMBED_LINKS","ATTACH_FILES","ADD_REACTIONS","MENTION_EVERYONE","MANAGE_MESSAGES","READ_MESSAGE_HISTORY"]
    },
    {
      id:role1,
      allow:["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"]
    },
    {
      id:role2,
      allow:["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"]
    },
    {
      id: interaction.guild.roles.everyone,
      deny:["VIEW_CHANNEL"]
    }
        ]
}).then(async c => {
        
       
        await db.set(`ticket_${c.id}`, {
          ticketby : interaction.user.id,
          count:count,
          
        })
        
        await c.send({embeds:[embed], content:`${interaction.user} Welcome`, components:[row]})
        await interaction.editReply({content:`Ticket created ${c}`})
        let e = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({dynamic:true})
        })
          .setThumbnail(interaction.guild.iconURL({dynamic:true}))
          .setFooter({
          text:"ThailandCodes © / Th | N A S S E R",
          iconURL: interaction.guild.iconURL({dynamic:true})
          })
        

        .addFields(
          {
            name:`**Ticket**`,
            value:`${c}`
          },
          {
            name:`**Ticket Owner**`,
            value:`${interaction.user}`
          },
          {
            name:`**Ticket Number**`,
            value:`${count}`
          },
        )
        if (log) {
        log.send({embeds:[e]})
        }
      })
    
    
      
    }
    
  }
})
