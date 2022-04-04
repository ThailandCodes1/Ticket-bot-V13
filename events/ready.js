const client = require("../index.js")
client.on("ready", () => {
  console.log("Ticket Bot is Ready Th | N A S S E R ♕︎©")
  client.user.setPresence({
    status: 'idle',
    activities: [{ 
      name: '/help',
      type:"WATCHING",
    }],
     });
})
