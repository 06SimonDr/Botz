console.log('===\nBot starting...\n===')

require('dotenv').config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, totalShards: 'auto' });

manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();