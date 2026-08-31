require("dotenv").config()
const { REST, Routes} = require("discord.js")

const commands = [
  {
    name: "help",
    description: "Shows the help menu of CMDPS",
  },
  {
    name: "givedeveloper",
    description: "gives developer role",
  },
  {
    name: "givedesigner",
    description: "gives designer role",
  },
  {
    name: "givroles",
    description: "Gives the roles normaly given when joining the server, use if you didnt receive them."
  },
  {
    name: "createticket",
    description: "Create an ticket"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...")
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log("Slash commands were registered successfully!")
    }catch (error) {
        console.log(`There was an error: ${error}`)
    }
}
)()
