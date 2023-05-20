const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    if (member.guild.id !== constantsFile.testServerID) return;

    const welcomeChannel = await member.guild.channels.fetch(constantsFile.testChannelID);
    const embed = new EmbedBuilder()
      .setTitle(`Welcome ${member.user.username}!`)
      .setDescription(
        "˚₊· `🌹`﹒ᥫ᭡﹒**welcome to our server**﹒ィ﹒\n˚₊︶꒷꒦꒷﹒check out these channels﹒`🍄`\n꒰  .   ⁺ `🍁`〃﹒˚ <#983034322867089428> \n`🐞`﹐˚₊·ꔫ﹒<#891726207794696242>\n ᕱᕱ﹒ ⁺ `🍓`୧﹕♪ <#891727716095782932> \n✿𓂃   ˚₊﹒enjoy your time here, cutie !﹐⚘️"
      )
      .setColor("B9F5A1");

    welcomeChannel.send({ embeds: [embed] });
  },
};
