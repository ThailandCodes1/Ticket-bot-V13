const client = require("../index");
const { Collection } = require("discord.js") 
const cooldowns = new Map()
const db = require("pro.db")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        let black = db.fetch(`black_${interaction.user.id}`)

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
      if (interaction.guild == null ) return interaction.reply({
  content:"🙄 - This is not a server"
})
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

if(!interaction.member.permissions.has(cmd.userPerms || [])) return interaction.reply({
  content: `You Don't Have \`${cmd.userPerms}\` Permission`,
  ephemeral:true
})
      

      if (interaction.user.id === black) return interaction.reply({content:"❌ You're in blacklist so you can't use commands", ephemeral:true})


if (!cooldowns.has(cmd)) {
        const coll = new Collection()
        cooldowns.set(cmd, coll)
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(cmd);
    const cooldown_amount = (cmd.cooldown) * 1000
    if (time_stamps.has(interaction.member)) {
        const expiration_time = time_stamps.get(interaction.member) + cooldown_amount;
        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000
            return interaction.reply({content:`**You Are In Cooldown Please Wait \`${time_left.toFixed(1)}\` To Use \`${cmd.name}\` Again**`, ephemeral:true})
        }
    }

    time_stamps.set(interaction.member, current_time)
    setTimeout(() => time_stamps.delete(interaction.member), cooldown_amount);

      
        cmd.run(interaction, client, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
