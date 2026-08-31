require("dotenv").config()
const {Client, IntentsBitField, messageLink, ActivityType, ChannelType, MessageFlags} = require("discord.js")

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
client.on("clientReady", (c) => {
    console.log(`The bot ${c.user.username} is online🟢`)
    client.user.setActivity({
        name: "Made by NPC (npcnichtvorhanden)", 
        type: ActivityType.Custom
    })
})
client.on("guildMemberAdd", (member) => {
    console.log(member.displayName, " (", member.user.username, ") joined CMDPS")
    member.roles.add("1496963076250009660");
    member.roles.add("1496962546974986272");
    member.roles.add("1496962432592252948");
    member.roles.add("1496962282784166028");
    return;
})
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return; 
  if (interaction.commandName == "help") {
    console.log(interaction.member.globalName, " used command: /help.");
    interaction.reply({
      content:"Welcome to CMDPS, Lets get started. \nThere are currently 5 Commands: \n/createticket: Opens an support ticket. \n/givedeveloper: gives you the developer role. \n/givedesigner: Gives designer role. \n/help: opens this menu \nI hope youre enjoying CMDPS",
      flags:MessageFlags.Ephemeral});
      console.log(interaction.member.globalName, "helped.");
    return;
  }
  if (interaction.commandName == "givroles") {
    await interaction.member.roles.add("1496963076250009660");
    await interaction.member.roles.add("1496962546974986272");
    await interaction.member.roles.add("1496962432592252948");
    await interaction.member.roles.add("1496962282784166028");
    interaction.reply({content:"Given roles!", flags:MessageFlags.Ephemeral});
    return;
  }

  if (interaction.commandName === "createticket") {
    console.log(interaction.member.displayName, "created a ticket!");

    try {
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            reason: `${interaction.user.username} needed a ticket.`,
        });

        await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            {
                ViewChannel: false,
            }
        );

        const adminRole = await interaction.guild.roles.fetch("1540983682486108261");
        const supervisorRole = await interaction.guild.roles.fetch("1496961787453636658");

        if (adminRole) {
            await channel.permissionOverwrites.edit(adminRole, {
                ViewChannel: true,
            });
        }

        if (supervisorRole) {
            await channel.permissionOverwrites.edit(supervisorRole, {
                ViewChannel: true,
            });
        }

        await channel.permissionOverwrites.edit(interaction.user.id, {
            ViewChannel: true,
        });

        await interaction.reply({
            content: `Ticket created: ${channel}`,
            flags: MessageFlags.Ephemeral,
        });

    } catch (error) {
        console.error(error);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: "Error: Couldn't create a ticket.",
                flags: MessageFlags.Ephemeral,
            });
        }
    }

    return;
  }
  if (interaction.commandName == "givedeveloper") {
    console.log(interaction.member.globalName, " used command: /givedeveloper.");
    await interaction.member.roles.add("1496962823392198856");
    interaction.reply({content:"Developer role given.", flags:MessageFlags.Ephemeral})
    console.log(interaction.member.globalName, " given developer role.");
    return;
  }
  if (interaction.commandName == "givedesigner") {
    console.log(interaction.member.globalName, " used command: /givedesigner.");
    await interaction.member.roles.add("1496962627371270184");
    interaction.reply({content:"Designer role given.", flags:MessageFlags.Ephemeral})
    console.log(interaction.member.globalName, " given designer role.");
    return;
  }
  interaction.reply(
    `${interaction.commandName} is a not recognized command, please check spelling.`,
  );
})

client.login(process.env.TOKEN)
