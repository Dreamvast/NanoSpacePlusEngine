const { EmbedBuilder } = require('discord.js');

// Main code
module.exports = { 
    name: "loop",
    description: "Loop song in queue type all/current!",
    options: [
        {
            name: "type",
            description: "Type of loop",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Current",
                    value: "current"
                },
                {
                    name: "Queue",
                    value: "queue"
                }
            ]
        }
    ],
    run: async (interaction, client, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "loop_loading")}`);
        const player = client.manager.get(interaction.guild.id);
        if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        if(interaction.options.getString('type') === "current") {
            if (player.trackRepeat === false) {
                player.setTrackRepeat(true);

                const looped = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "music", "loop_current")}`)
                    .setColor(client.color);

                    return msg.edit({ content: " ", embeds: [looped] });
            } else {
                player.setTrackRepeat(false);

                const unlooped = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "music", "unloop_current")}`)
                    .setColor(client.color);

                    return msg.edit({ content: " ", embeds: [unlooped] });
            }
        }
        else if(interaction.options.getString('type') === "queue") {
            if (player.queueRepeat === true) {
                player.setQueueRepeat(false);

                const unloopall = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "music", "unloop_all")}`)
                    .setColor(client.color);

                    return msg.edit({ content: " ", embeds: [unloopall] });
            }
            else {
                player.setQueueRepeat(true);

                const loopall = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "music", "loop_all")}`)
                    .setColor(client.color);

                    return msg.edit({ content: " ", embeds: [loopall] });
            }
        }
    }
};
