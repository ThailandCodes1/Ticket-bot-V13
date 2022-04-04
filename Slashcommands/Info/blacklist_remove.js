const db = require("pro.db")
module.exports = {
  name:"blacklist_remove",
  description:"when you remove someone from blacklist he can use commands or open tickets",
  cooldown:15,
  userPerms:["ADMINISTRATOR"],
  options:[
    {
      name:"user",
      description:"User to removed",
      type:"USER",
      required:true
    },
  ],
  run : async(interaction, client, args) => {
    await interaction.deferReply()

    let user = interaction.options.getMember("user")

    let bl_u = db.fetch(`black_${user.user.id}`)
    
    if (!bl_u) return interaction.editReply({content:"> 🤔 - This user isn't on blacklist"});
    
    await db.delete(`black_${user.user.id}`)
    await interaction.editReply({content:"✅ Done"})
  }
}
