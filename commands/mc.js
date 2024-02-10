const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mcs = require('node-mcstatus');

const { mc } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mc')
        .setDescription('Get Minecraft Server Status')
        .addSubcommand(option =>
            option.setName('host')
                .setDescription('Get host URL'))
        .addSubcommand(option =>
            option.setName('port')
                .setDescription('Get server port'))
        .addSubcommand(option =>
            option.setName('player')
                .setDescription('Get players list')),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'host':
                var embed = new EmbedBuilder()
                    .setTitle('Host')
                    .setDescription('Minecraft Server IP')
                    .setColor('#ff0000')
                    .addFields(
                        { name: 'Java Edition', value: `IP: ${mc.host}\nPort: 25565` },
                        { name: 'Bedrock Edition', value: `IP: ${mc.host}\nPort: 19132` },
                    )
                await interaction.reply({ embeds: [embed] });
                break;
            case 'port':
                var embed = new EmbedBuilder()
                    .setTitle('Port')
                    .setDescription('Minecraft Server Port')
                    .setColor('#ff0000')
                    .addFields(
                        { name: 'Java Edition', value: 'Port: 25565' },
                        { name: 'Bedrock Edition', value: 'Port: 19132' },
                    )
                await interaction.reply({ embeds: [embed] });
                break;
            case 'player':
                let players, list = ' ';
                await mcs.statusJava(mc.host, mc.port, mc.options)
                    .then((result) => {
                        players = result.players;
                        for (i in players.list) {
                            list = list + players.list[i].name_clean + '\n';
                        }
                        var embed = new EmbedBuilder()
                            .setTitle('Players list')
                            .setDescription('5/4 Ma Krub Minecraft')
                            .setColor('#ff0000')
                            .addFields(
                                { name: 'Player', value: `Online ${players.online}/${players.max}` },
                                { name: 'List', value: list },
                            )
                        interaction.reply({ embeds: [embed] });
                    })
                    .catch((error) => { interaction.reply('ERROR') })

                break;
        }
    },
};