const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('homework')
		.setDescription('Replies with Homework!'),
	async execute(interaction) {
        let today = new Date().toLocaleDateString('en-US');
        today = today.toString();
        let todayFormat = '';
        todayFormat += today.slice(8, 10) + today.slice(0, 2) + today.slice(3, 5);
        let raw = fs.readFileSync('homework.json');
        let homework = JSON.parse(raw);
        let react = '';
        for (let i of homework) {
            if (parseInt(i.due) >= parseInt(todayFormat) || parseInt(i.date) == 0) {
                let day = '';
                day += i.due.slice(4, 6) + '/' + i.due.slice(2, 4) + '/' + i.due.slice(0, 2);
                react += i.subject + ' ' + i.about + ' ' + day + '\n';
            }
        }
        await interaction.reply(react)
	},
};



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   