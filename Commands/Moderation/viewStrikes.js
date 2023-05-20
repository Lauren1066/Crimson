const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const strikeSchema = require("../../Models/strikes.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("viewstrikes")
    .setDescription("View strikes of a member.")
    .addUserOption((option) => option.setName("user").setDescription("The user to view strikes").setRequired(true)),
  async execute(interaction) {
    const memberID = interaction.options.getUser("user").id;

    const strikeData = await strikeSchema.findOne({ memberID });

    if (!strikeData) {
      return interaction.reply("This member has no strikes.");
    }

    const { strikeCount, reasons } = strikeData;
    const strikeList = reasons.map((reason, index) => `\`${index + 1})\` ${reason}`).join("\n");

    const member = await interaction.guild.members.fetch(memberID);
    const username = member ? member.user.username : "Unknown User";

    const embed = new EmbedBuilder().setTitle(`${username}'s Strikes`).setDescription(strikeList).setColor("Red");

    interaction.reply({ embeds: [embed] });
  },
};
