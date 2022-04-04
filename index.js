const app = require("express")();app.get('/', (req, res) =>{res.send("N A S S E R ♕︎");});app.listen(8080);

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});    




const Discord = require("discord.js");

const db = require("pro.db")

const { Client, MessageEmbed, MessageButton, MessageActionRow, Collection } = require("discord.js")

const client = new Client({intents:32767});

require("./handler")(client);
module.exports = client;

client.slashCommands = new Collection();
client.login(process.env.token)
