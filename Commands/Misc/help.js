const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Get a list of available commands."),
  async execute(interaction, client) {
    const commandList = client.commands.map((command) => `\`/${command.data.name}\` - ${command.data.description}`).join("\n");

    await interaction.reply(`**Commands List**:\n\n${commandList}`);
  },
};
