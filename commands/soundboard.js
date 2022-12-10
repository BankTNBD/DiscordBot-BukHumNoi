const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, Events, SelectMenuBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;/*
const { joinVoiceChannel } = require('@discordjs/voice');

const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soundboard')
		.setDescription('Replies with SoundBoard!'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
			new SelectMenuBuilder()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions(
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'soundboard, test',
					},
				),
		);

		await interaction.editReply({ content: 'Pong!', components: [row] });
        
        //await interaction.reply(react)
	},
};