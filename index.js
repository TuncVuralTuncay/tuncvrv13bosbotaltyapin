const {Discord,Client,Intents,Collection,MessageEmbed,MessageButton,MessageActionRow} = require("discord.js")
const client = new Client({intents : 32509 })
const fs = require("fs")
const ayarlar = require("./ayarlar.json")
// Message başlangıç kısmı
client.on("messageCreate", async message => {
    var prefix = "w-";
    if (message.author.bot) return; 
    if (!message.guild) return; 
  
    if (!message.content.startsWith(prefix)) return; 
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase(); 
  
    if (cmd.length === 0) return; 
  
    var command = client.commands.get(cmd); 
    if (!command) command = client.commands.get(client.aliases.get(cmd));
  
  
    if (command) 
    {
      try {
        command.execute(client, message, args, message.author, args.join(" "), prefix)
      } catch (error) {
        console.log(error)
      }
    } else 
    return message.reply(`Komut bulunamadı.`)
  });
  //Message bitiş kısmı


  //komut yükleme kısmı
    client.commands = new Collection();
    client.aliases = new Collection();
    client.categorys = new Collection();
    const commandFiles = fs.readdirSync("./komutlar").filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./komutlar/${file}`);
        client.commands.set(command.name, command);
        if(!command.aliases) { 
            continue; 
        }else {
            command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
        });
    }
}
//komut yükleme kısmı bitiş


//Ready.js başlangıç kısmı
client.on("ready", () => {
    console.log(`${client.user.username} ismi ile giriş yapıldı.`)
    var durum = [`${client.guilds.cache.size} sunucuya hizmet veriyorum`, `${client.guilds.cache.reduce((a,b) => a+b.memberCount,0 ).toLocaleString()} kullanıcıya hizmet veriyorum`, `${client.channels.cache.size} kanala hizmet veriyorum`]
    let namea = durum[Math.floor(Math.random() * durum.length)];
    setInterval(function() {
        client.user.setPresence({activities : [{name : namea, type : "WATCHING"}]}) });
    }, 10000)
  
//Ready.js bitiş kısmı
client.login(ayarlar.token);