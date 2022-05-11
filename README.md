# Simple Discord Connection

This is a simple code for connect your discordjs bot.
You can connect your bot and you can play a music of your files like :

C://music_folder/best_music.mp3

# How code works


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
    
When the bot will see that the person write:

    !music
    
The bot will join in the current voice channel where the person is:

    const voice  = joinVoiceChannel({
              channelId: msg.member.voice.channel.id,
              guildId: msg.guild.id,
              adapterCreator: msg.guild.voiceAdapterCreator
          }) 
          
After that we need to create a AudioPlayer for the bot to speak:

          const audioPlayer = createAudioPlayer();
          
When its created we need to create a resource where the file is and a subcription to play the audio:
        
          const resource = createAudioResource(createReadStream(join(__dirname, "/MUSIC_FOLDER" + "music.mp3")));

          const subscription = voice.subscribe(audioPlayer);

          audioPlayer.play(resource);
          
When the bot have all the configuration all you need is to put him to speak:


          audioPlayer.on(AudioPlayerStatus.Playing, () => {
              console.log(":notes: currently playing");
              console.log("resource started:", resource.started);
          });
          
After that the bot will provider the music you selected.


