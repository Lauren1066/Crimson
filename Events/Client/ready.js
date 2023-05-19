const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");

const config = require("../../Storage/config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
      activities: [{ name: `Keeping Crimson Safe!`, type: ActivityType.Playing }],
      status: "online",
    });

    mongoose.set("strictQuery", true);

    await mongoose.connect(config.mongoosePath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};
