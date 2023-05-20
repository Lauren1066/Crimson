const constantsFile = require("../../Storage/constants.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      if (interaction.guild.id == constantsFile.mainServerID || interaction.guild.id == constantsFile.testServerID) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
          console.log(`${interaction.commandName} was run by ${interaction.user.username}`);
          await command.execute(interaction, interaction.client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    }
  },
};
