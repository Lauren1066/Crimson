const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("welcome").setDescription("Show the welcome message."),
  async execute(interaction) {
    interaction.client.emit("guildMemberAdd", interaction.member);
  },
};
