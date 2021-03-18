import { AkairoClient, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { BotCommandHandler } from './BotCommandHandler';
import { DiscordAPIError, Message, MessageAdditions, MessageOptions, Permissions, TextChannel, APIMessageContentResolvable } from 'discord.js';
import AllowedMentions from '../utils/AllowedMentions';
import functions from '../../constants/functions';
import emojis from '../../constants/emojis';
import colors from '../../constants/colors';
import readline from 'readline';
import { join } from 'path';
import mongoose from 'mongoose';
import { ChannelNotFoundError, ChannelWrongTypeError } from './ChannelErrors';
import db from '../../constants/db';
import { Intents } from 'discord.js';
import * as creds from '../../config/credentials';
import * as botoptions from '../../config/botoptions';
import log from '../../constants/log';

export type MessageType = APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});
interface BotOptions {
	defaultPrefix?: string;
	owners: string | string[];
	errorChannel: string;
	generalLogChannel: string;
	environment: string;
	info: boolean;
	verbose: boolean;
}
interface BotCredentials {
	token: string;
	MongoDB: string;
	hypixelApiKey: string;
}

// custom client
export default class BotClient extends AkairoClient {
	public config: BotOptions;
	public credentials: BotCredentials;
	public disabledCommands: string[] = [];

	public consts = {
		...emojis,
		...functions,
		...colors
	};

	// for bot options
	public constructor() {
		super(
			{
				ownerID: botoptions.owners,
				intents: Intents.ALL
				/*presence: { 
					activity: {
						name: 'Moulberry',
						type: 'WATCHING',
					},
					status: 'online',
				}*/
			},
			{
				allowedMentions: new AllowedMentions().toObject(),
				intents: Intents.ALL
				/*ws: {
					properties: {
						$browser: 'Discord iOS',
					},
				},*/
			}
		);
		(this.config = botoptions), (this.credentials = creds);
	}

	// listener handler
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, '..', '..', 'listeners')
	});

	// inhibitor handler
	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, '..', '..', 'inhibitors'),
		automateCategories: true
	});

	// command handler
	public commandHandler: BotCommandHandler = new BotCommandHandler(this, {
		directory: join(__dirname, '..', '..', 'commands'),
		prefix: message => {
			if ((botoptions.environment as 'production' | 'development') === 'development') {
				return 'dev';
			} else if (message.guild) {
				return db.guildGet('prefix', message.guild.id, botoptions.defaultPrefix);
			} else {
				return botoptions.defaultPrefix;
			}
		},
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 6e4,
		argumentDefaults: {
			prompt: {
				start: 'Placeholder argument prompt. If you see this please tell the devs.',
				retry: 'Placeholder failed argument prompt. If you see this please tell the devs.',
				modifyStart: (_: Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
				modifyRetry: (_: Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
				timeout: 'You took too long the command has been cancelled',
				ended: 'You exceeded the maximum amount of tries the command has been cancelled',
				cancel: 'The command has been cancelled',
				retries: 3,
				time: 3e4
			},
			otherwise: ''
		},
		ignorePermissions: botoptions.owners,
		ignoreCooldown: botoptions.owners
	});

	// initializes command handlers and stuff
	private _init(): void {
		this.commandHandler.resolver.addType('permission', (message, phrase) => {
			if (!phrase) return null;
			phrase = phrase.toUpperCase().replace(/ /g, '_'); // Modify to how d.js shows permissions
			if (!Permissions.FLAGS[phrase]) {
				return null;
			} else {
				return phrase;
			}
		});
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
			stdin: rl,
			gateway: this.ws
		});
		// loads all the stuff
		const loaders = {
			commands: this.commandHandler,
			listeners: this.listenerHandler,
			inhibitors: this.inhibitorHandler
		};
		for (const loader of Object.keys(loaders)) {
			try {
				loaders[loader].loadAll();
				log.success('Startup', `Successfully loaded <<${loader}>>`);
			} catch (e) {
				log.error('Startup', `Failed to load <<${loader}>> with error:\n${e.stack}`);
			}
		}
	}

	/**
	 * Logs something to the log channel, or throws an error if channel is not found
	 * @param message - The text to log
	 * @throws ChannelNotFoundError - When the channel is invalid or not accessible
	 * @throws ChannelWrongTypeError - When the channel is not a TextChannel
	 * @returns Promise<Message> - The message sent
	 */
	public async log(message: MessageType): Promise<Message> {
		const cID = this.config.generalLogChannel;
		let channel: TextChannel;
		try {
			channel = (await this.channels.fetch(this.config.generalLogChannel)) as TextChannel;
		} catch (e) {
			if (e instanceof DiscordAPIError) {
				throw new ChannelNotFoundError(cID);
			}
		}
		if (!(channel instanceof TextChannel)) {
			throw new ChannelWrongTypeError(cID, TextChannel);
		}
		return channel.send(message);
	}

	/**
	 * Logs something to the error channel, or throws an error if channel is not found
	 * @param message - The text to log
	 * @throws ChannelNotFoundError - When the channel is invalid or not accessible
	 * @throws ChannelWrongTypeError - When the channel is not a TextChannel
	 * @returns Promise<Message> - The message sent
	 */
	public async error(message: MessageType): Promise<Message> {
		const cID = this.config.errorChannel;
		let channel: TextChannel;
		try {
			channel = (await this.channels.fetch(cID)) as TextChannel;
		} catch (e) {
			if (e instanceof DiscordAPIError) {
				throw new ChannelNotFoundError(cID);
			}
		}
		if (!(channel instanceof TextChannel)) {
			throw new ChannelWrongTypeError(cID, TextChannel);
		}
		return channel.send(message);
	}

	public async DB(): Promise<void> {
		try {
			await mongoose.connect(this.credentials.MongoDB, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true
			});
			log.success('Startup', 'Successfully connected to <<database>>');
		} catch (e) {
			log.error('Startup', `Failed to connect to <<database>> with error:\n${e}`);
		}
	}

	public async start(): Promise<void> {
		await this._init();
		await this.DB();
		await this.login(this.credentials.token);
	}

	public destroy(relogin = false): void {
		super.destroy();
		if (relogin) {
			this.login(this.credentials.token);
		}
	}
}
