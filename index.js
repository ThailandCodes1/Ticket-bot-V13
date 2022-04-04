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


const Canvas = require("canvas")
client.on("ready", async () =>  {
  console.log(client.user.username)
  let guild = client.guilds.cache.get("940751006625566790")//ايدي السيرفر
  let channel = client.channels.cache.get("941756101311995906")//ايدي الروم
  /*
let e = new MessageEmbed()
  .setDescription("e")
  channel.send({embeds:[e]})
*/
  let countdownt = new Date("May 2, 2022 22:00:00").getTime();
  
  let counter = setInterval(async() =>  {
    let datenow = new Date().getTime();
    let datediff = countdownt - datenow;
    

    let days = Math.floor(datediff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((datediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minutes = Math.floor((datediff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((datediff % (1000 * 60)) / 1000)


    await Canvas.registerFont("AlfaSlabOne-Regular.ttf", { family: "AlfaSlabOne-Regular" });
    const canvass = Canvas.createCanvas(1920,750);
        const contextt = canvass.getContext('2d');

        const backgroundd = await Canvas.loadImage('https://media.discordapp.net/attachments/954848794850246756/955844131404541952/Picsart_22-03-22_16-00-31-457.png');
        contextt.drawImage(backgroundd, 0, 0, canvass.width, canvass.height);



        
contextt.font = '300px AlfaSlabOne-Regular';
        contextt.fillStyle = '#f33c6c';
        contextt.fillText(`${days < 10 ? `0${days}` : days }:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`, canvass.width / 6.2, canvass.height / 1.5);
    const attachment = new Discord.MessageAttachment(canvass.toBuffer(), "Ramadan.png");
    
let embed = new Discord.MessageEmbed()
    .setFooter({text:`🌙 Ramadan`})
    .setAuthor({name:channel.guild.name, iconURL:channel.guild.iconURL({dynamic:true})})
    .setColor("#DB3393")
    .setImage(`attachment://Ramadan.png`)

    .setDescription(`**الوقت المتبقي على انتهاء الشهر الفضيل , تقبل الله طاعاتكم <a:emoji_185:959440866332778536>  **\n\n**Left :**\n <t:1651482000:R> **Days: ${days},** **Hours : ${hours},** **Minutes : ${minutes},** **Seconds : ${seconds}**`)
  channel.messages.fetch("959437236867317791").then(m => m.edit({embeds: [embed],files:[attachment]}))//ايدي المسج
/*
    if(datediff < 0) {
      clearInterval(counter)
      let i = new Discord.MessageAttachment("https://media.discordapp.net/attachments/959192095594262628/959203874290413658/animated-ramadan-kareem-3.gif", "ramadan.gif");
      
       channel.messages.fetch("959437236867317791").then(me => { 

        let embe = new MessageEmbed()
      .setDescription("<a:emoji_185:959440866332778536>  **رمضان كريم كل عام وانتم بخير , انتظرونا في فعاليات رمضان** <a:emoji_185:959440866332778536>")
      .setImage("attachment://ramadan.gif")
      .setFooter(`🌙 Ramadan`)
    .setAuthor(channel.guild.name, channel.guild.iconURL({dynamic:true}))
    .setColor("#DB3393")
      me.edit({embeds:[embe],files:[i]})
      })
    
    }
  */
  },20000)
})
