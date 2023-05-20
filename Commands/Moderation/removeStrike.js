const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Strikes = require("../../Models/strikes.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removestrike")
    .setDescription("Remove a strike from a member.")
    .addUserOption((option) => option.setName("user").setDescription("The user to remove a strike from").setRequired(true))
    .addNumberOption((option) => option.setName("reason_number").setDescription("The reason number to remove").setRequired(true)),
  async execute(interaction) {
    const userToRemoveStrike = interaction.options.getUser("user");
    const reasonNumber = interaction.options.getNumber("reason_number");
    let strikeData = await Strikes.findOne({ memberID: userToRemoveStrike.id });

    if (!strikeData || strikeData.strikeCount === 0) {
      return interaction.reply("This member has no strikes.");
    }

    if (reasonNumber < 1 || reasonNumber > strikeData.strikeCount) {
      return interaction.reply("Invalid reason number. Please provide a valid reason number.");
    }

    strikeData.strikeCount--;
    strikeData.reasons.splice(reasonNumber - 1, 1);
    await strikeData.save();

    const embed = new EmbedBuilder()
      .setTitle(`${userToRemoveStrike.tag}'s Strike Removed`)
      .setColor("Green")
      .setDescription(`Total strikes: ${strikeData.strikeCount}`);

    interaction.reply({ embeds: [embed] });
  },
};
