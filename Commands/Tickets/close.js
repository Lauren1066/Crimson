const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("close").setDescription("Close a support ticket."),
  async execute(interaction) {
    if (interaction.channel.name.startsWith("ticket-")) {
      await interaction.channel.delete();
    } else {
      await interaction.reply({ content: "This command can only be used in a ticket channel.", ephemeral: true });
    }
  },
};
