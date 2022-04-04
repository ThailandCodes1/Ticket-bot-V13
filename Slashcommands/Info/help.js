const { MessageEmbed } = require("discord.js")
module.exports = {
  name:"help",
  description:"🙃 help command",
  cooldown:15,
  options:[
    {
      name:"command",
      description:"help command",
      type:"STRING",
      choices:[
        {
          name:"Add",
          value:"Add"
        },
        {
          name:"Remove",
          value:"Remove"
        },
        {
          name:"Close",
          value:"Close"
        },
        {
          name:"Delete",
          value:"Delete"
        },
        {
          name:"Rename",
          value:"Rename",
        },
        {
          name:"Setup_tickets",
          value:"ST",
        },
        {
          name:"Send_Panel",
          value:"SP"
        },
        {
          name:"Ping",
          value:"Ping"
        },
        {
          name:"Blacklist_add",
          value:"bla"
        },
        {
          name:"Blacklist_remove",
          value:"blr"
        },
      ],
    },
  ],
  run : async(interaction, client, args) => {
    await interaction.deferReply()

    let choice = interaction.options.getString("command")

    if (choice === "Ping") {
      await interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> 🏓 This Command Returns The Ping of The Bot\n> \`/ping\``})
      },2 * 1000)
      )
    }
    if (choice === "Add") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ➕ This Command Helps You to Add Someone To The Ticket\n> \`/add\``})
      },2 * 1000)
      )
    }
    if (choice === "Remove") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ➖ This Command Helps You to Remove Someone From The Ticket\n> \`/remove\``})
      },2 * 1000)
      )
    }
    if (choice === "Close") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> 🔒 This Command Helps You To Close The Ticket\n> \`/close\``})
      },2 * 1000)
      )
    }
    if (choice === "Delete") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ⛔ This Command Helps You To Delete The Ticket\n> \`/delete\``})
      },2 * 1000)
      )
    }
    if (choice === "Rename") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ✍️ This Command Helps You To Rename The name of the Ticket\n> \`/rename\``})
      },2 * 1000)
      )
    }
    if (choice === "ST") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ⚙️ This Command Helps You To Setup The Tickets\n> \`/setup_tickets\``})
      },2 * 1000)
      )
    }
    if (choice === "SP") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ⚙️ This Command Helps You To Send Panel To Open Tickets\n> \`/send_panel\``})
      },2 * 1000)
      )
    }
    if (choice === "bla") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ⚫ This Command Helps You To Ban Someone from Open Tickets\n> \`/blacklist_add\``})
      },2 * 1000)
      )
    }
    if (choice === "blr") {
      interaction.editReply({content:"> <a:loading:958875394822529094> Loading..."}).then(() => 
      setTimeout(() => {
        interaction.editReply({content:`> ⚫ This Command Helps You To Remove Somone from Blacklist\n> \`/blacklist_remove\``})
      },2 * 1000)
      )
    }
    if (!choice) {
      let embed = new MessageEmbed()
      .setDescription(`/add : To add member to the ticket\n/remove : To remove member from the ticket\n/close : To lock ticket\n/delete : To delete the ticket\n/rename : To change name of the ticket\n/send_panel : To send button that can create tickets\n/setup_tickets : To set channels and roles like : staff roles, log, category\n/blacklist_add : To add member to blacklist\n/blacklist_remove : To remove member from blacklist`)
      .setAuthor({
        name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL({dynamic:true})
                 })
      .setThumbnail(interaction.guild.iconURL({dynamic:true}))
        .setFooter({
          text:"ThailandCodes © / Th | N A S S E R",
          iconURL: interaction.guild.iconURL({dynamic:true})
        })
      .setColor("#4453F5")

      interaction.editReply({embeds:[new MessageEmbed().setDescription("<a:loading:958875394822529094> Loading...").setColor("#4453F5")]}).then(() => 
      setTimeout(() => {
        interaction.editReply({embeds:[embed]})
      }, 2*1000))
    }
  }
}
