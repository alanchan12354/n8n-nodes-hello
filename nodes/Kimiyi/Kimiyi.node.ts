import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { NodeConnectionTypes } from 'n8n-workflow';

export class Kimiyi implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Kimiyi',
		name: 'kimiyi',
		icon: 'file:kimiyi.svg',
		group: ['transform'],
		version: 1,
		description: 'Kimiyi AI Node',

		defaults: {
			name: 'Kimiyi',
		},

		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'kimiyiApi',
				required: true,
			},
		],
		properties: [
			
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: 'uploadDocument',
				noDataExpression: true,
				options: [
					// --- Actions ---
					{
						name: 'Upload Document (Train)',
						value: 'uploadDocument',
						description: 'Upload a cloud file for AI training',
					},
					{
						name: 'Update Document (Retrain)',
						value: 'updateDocument',
						description: 'Update an existing cloud file and retrain',
					},
					{
						name: 'Auto Reply Messenger',
						value: 'autoReplyMessenger',
						description: 'Send automated reply to a Messenger user',
					},

					// --- Triggers ---
					{
						name: 'Trigger: Send Message',
						value: 'sendMessageTrigger',
						description: 'Trigger when a message is sent',
					},
					{
						name: 'Trigger: Welcome Message',
						value: 'welcomeMessageTrigger',
						description: 'Trigger when welcome message event fires',
					},
					{
						name: 'Trigger: Survey Message',
						value: 'surveyMessageTrigger',
						description: 'Trigger when survey event happens',
					},
					{
						name: 'Trigger: Fallback Message',
						value: 'fallbackMessageTrigger',
						description: 'Trigger when fallback event happens',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items: INodeExecutionData[] = [];

		items.push({
			json: {
				status: 'Kimiyi node loaded successfully',
			},
		});

		return this.prepareOutputData(items);
	}
}
