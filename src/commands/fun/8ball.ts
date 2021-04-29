import { BushCommand } from '../../lib/extensions/BushCommand';
import { Message } from 'discord.js';

export default class EightBallCommand extends BushCommand {
	public constructor() {
		super('8Ball', {
			aliases: ['8Ball', 'EightBall'],
			category: 'fun',
			description: {
				content: 'Ask questions for a randomly generated response.',
				usage: '8Ball <question>',
				examples: ['8Ball Does anyone love me?']
			},
			args: [
				{
					id: 'question',
					type: 'string',
					prompt: {
						start: 'What question would you like answered?',
						retry: '<:error:837123021016924261> Invalid question.'
					}
				}
			],
			channel: 'guild',
			clientPermissions: ['SEND_MESSAGES']
		});
	}
	public async exec(message: Message): Promise<void> {
		const responses = [
			'It is certain',
			'Without a doubt',
			'You may rely on it',
			'Yes definitely',
			'It is decidedly so',
			'As I see it, yes',
			'Most likely',
			'Yes',
			'Outlook good',
			'Signs point to yes',
			'Reply hazy try again',
			'Better not tell you now',
			'Ask again later',
			'Cannot predict now',
			'Concentrate and ask again',
			"Don't count on it",
			'Outlook not so good',
			'My sources say no',
			'Very doubtful',
			'My reply is no'
		];
		const answer = responses[Math.floor(Math.random() * responses.length)];
		await message.util.reply(answer);
	}
}
