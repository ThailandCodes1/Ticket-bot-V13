const db = require("pro.db")
module.exports = {
  name:"setup_tickets",
  description:"This Command to specify the staff roles & Category id",
  cooldown:15,
  userPerms:["ADMINISTRATOR"],
  options:[
    {
      name:"role_1",
      description:"First Role",
      type:"ROLE",
      required:true
    },
    {
      name:"role_2",
      description:"Second Role",
      type:"ROLE",
      required:true
    },
    {
      name:"category_id",
      description:"Category 🙃",
      type:"CHANNEL",
      channelTypes:[4],
      required:true
    },
    {
      name:"log_channel",
      description:"log channel 🙃",
      type:"CHANNEL",
      channelTypes:["GUILD_TEXT"],
      required:true
    }
  ],
  run : async(interaction, client, args) => {
    try {
      await interaction.deferReply()
      //Role_1
      let role_1 = interaction.options.getRole("role_1")
      //Role_2
      let role_2 = interaction.options.getRole("role_2")
      //Caterogry_id
      let category = interaction.options.getChannel("category_id")

      let log = interaction.options.getChannel("log_channel")
       
      //Role_1
     await db.set(`role1_${interaction.guild.id}`,role_1.id)
      //Role_2
     await db.set(`role2_${interaction.guild.id}`,role_2.id)
      //Category_id
     await db.set(`cy_${interaction.guild.id}`,category.id)
    
      //log_channel
await db.set(`log_${interaction.guild.id}`,log.id)
      
      await interaction.editReply({content:`> ✅ | Done\n> Role_1 : ${role_1}\n> Role_2 : ${role_2}\n> Category : ${category}\n> Log-Channel : ${log}`})
    } catch (err) {
      console.log(err)
      interaction.editReply({content:'❗ Error'})
    }
  }
}
