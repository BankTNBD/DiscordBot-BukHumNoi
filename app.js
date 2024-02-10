const fs = require('node:fs');
const path = require('node:path');
const mcs = require('node-mcstatus');
const schedule = require('node-schedule');
const { Client, Events, Collection, GatewayIntentBits, ActivityType } = require('discord.js');

const { token, mc } = require('./config.json');
let players = {};

process.env.TZ = 'Asia/Bangkok'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			//await interaction.deferReply({ephemeral:true});
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);

const job = schedule.scheduleJob('*/1 * * * *', function(){
	mcs.statusJava(mc.host, mc.port, mc.options)
    .then((result) => {
	   players = result.players;
	   client.user.setPresence({ 
		activities: [{ 
			name: `${players.online}/${players.max} players`, 
			type: ActivityType.Playing
		}], 
		status: 'online' 
	});
    })
    .catch((error) => {})
});