const db = require("pro.db")
module.exports = {
  name:"blacklist_add",
  description:"when you add someone he can't use commands or open tickets",
  cooldown:15,
  userPerms:["ADMINISTRATOR"],
  options:[
    {
      name:"user",
      description:"User to added",
      type:"USER",
      required:true
    },
  ],
  run : async(interaction, client, args) => {
    await interaction.deferReply()

    let user = interaction.options.getMember("user")

    let bl_u = db.fetch(`black_${user.user.id}`)



    if (user.user.id === interaction.user.id) return interaction.editReply({content:"🙄 - You can't add yourself"})


    
    if (user.user.id === bl_u) return interaction.editReply({content:"> 🙃 - This user is already on blacklist"});
    
    await db.set(`black_${user.user.id}`,user.user.id)
    await interaction.editReply({content:"✅ Done"})
  }
}
