const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newhomework')
		.setDescription('Add new homework')
        .addStringOption(option =>
            option.setName('subject')
                .setDescription('รายวิชา')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('due')
                .setDescription('วันส่ง')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('about')
                .setDescription('รายละเอียด')
                .setRequired(true)),
	async execute(interaction) {
        let today = new Date()
        let todayFormat = '';
        todayFormat += today.slice(2, 4) + (parseInt(today.slice(5, 7)) + 1).toString + today.slice(8, 10);
        let data = fs.readFileSync('homework.json');
        let object= JSON.parse(data);
        let hw = {
            "date": parseInt(todayFormat),
            "subject": interaction.options.getString('subject'),
            "due": interaction.options.getString('due'),
            "about": interaction.options.getString('about')
        }
        object.push(hw);

        data = JSON.stringify(object);
        fs.writeFile('homework.json', data, err => {
            if(err) throw err;
        });
        await interaction.reply('เพิ่มการบ้านแล้ว')
	},
};