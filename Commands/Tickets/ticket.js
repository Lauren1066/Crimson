const { SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ticket").setDescription("Create a support ticket."),
  async execute(interaction) {
    const ticketButton = new ButtonBuilder().setCustomId("create_ticket").setLabel("Open a ticket!").setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents(ticketButton);

    await interaction.reply({ content: "Click the button below to create a support ticket.", components: [row] });
  },
};
