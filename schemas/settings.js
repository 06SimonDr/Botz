const { Schema, model } = require("mongoose");

const guildSettingSchema = new Schema({
  serverId: { type: String },
  prefix: { type: String, default: "!" }
});

module.exports = model("guild_settings", guildSettingSchema);