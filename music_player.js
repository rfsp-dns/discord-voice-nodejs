require('yourenvfile').config();
const { createReadStream } = require('node:fs');
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const {join} = require('path')
const { AudioPlayerStatus, createAudioPlayer, createAudioResource, AudioResource, StreamType } = require('@discordjs/voice');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.GUILD_VOICE_STATES] }); 

client.on("ready", () => {
   console.log("BOT READY!")
});

client.on("messageCreate", (msg) => {
    console.log(msg.content)
    if (msg.content == "!music"){
      const voice  = joinVoiceChannel({
          channelId: msg.member.voice.channel.id,
          guildId: msg.guild.id,
          adapterCreator: msg.guild.voiceAdapterCreator
      })
        
      const audioPlayer = createAudioPlayer();

      const resource = createAudioResource(createReadStream(join(__dirname, "/MUSIC_FOLDER" + "music.mp3")));
      
      
      const subscription = voice.subscribe(audioPlayer);
      
      audioPlayer.play(resource);
  
      audioPlayer.on(AudioPlayerStatus.Playing, () => {
          console.log(":notes: currently playing");
          console.log("resource started:", resource.started);
      });
      }
});
    

client.login("YOUR_TOKEN_FROM_ENV_FILE"); 