const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const strikeSchema = require("../../Models/strikes.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("strike")
    .setDescription("Strike a member.")
    .addUserOption((option) => option.setName("user").setDescription("The user to strike").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("Reason for the strike").setRequired(true)),
  async execute(interaction) {
    const userToStrike = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    let strikeData = await strikeSchema.findOne({ memberID: userToStrike.id });

    if (!strikeData) {
      strikeData = await strikeSchema.create({ memberID: userToStrike.id, strikeCount: 1, reasons: [reason] });
    } else {
      strikeData.strikeCount++;
      strikeData.reasons.push(reason);
      await strikeData.save();
    }

    const embed = new EmbedBuilder()
      .setTitle(`${userToStrike.tag} had a strike added!`)
      .setColor("Red")
      .addFields(
        { name: "Moderator", value: interaction.user.username },
        { name: "Reason", value: reason },
        { name: "Total Strikes", value: strikeData.strikeCount.toString() }
      );
    interaction.reply({ embeds: [embed] });
  },
};
