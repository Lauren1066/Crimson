const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { deploy } = require("./Functions/Handlers/deploy.js");
const { loadEvents } = require("./Functions/Handlers/events.js");
const { loadCommands } = require("./Functions/Handlers/commands.js");

deploy();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();
client.config = require("./Storage/config.json");

module.exports = { client };

client
  .login(client.config.token)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
  })
  .catch((error) => {
    console.error(error);
  });
