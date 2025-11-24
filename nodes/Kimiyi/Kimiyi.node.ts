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
					// Actions
					{
						name: 'Upload Document (Train)',
						value: 'uploadDocument',
					},
					{
						name: 'Update Document (Retrain)',
						value: 'updateDocument',
					},
					{
						name: 'Auto Reply Messenger',
						value: 'autoReplyMessenger',
					},

					// Triggers
					{
						name: 'Trigger: Send Message',
						value: 'sendMessageTrigger',
					},
					{
						name: 'Trigger: Welcome Message',
						value: 'welcomeMessageTrigger',
					},
					{
						name: 'Trigger: Survey Message',
						value: 'surveyMessageTrigger',
					},
					{
						name: 'Trigger: Fallback Message',
						value: 'fallbackMessageTrigger',
					},
				],
			},

			// Upload Document Fields
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				default: 'Dropbox',
				options: [
					{ name: 'Dropbox', value: 'Dropbox' },
					{ name: 'OneDrive', value: 'OneDrive' },
					{ name: 'Google Drive', value: 'Google Drive' },
				],
				required: true,
				displayOptions: {
					show: { operation: ['uploadDocument'] },
				},
			},
			{
				displayName: 'Document Link',
				name: 'doc_link',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://...',
				displayOptions: {
					show: { operation: ['uploadDocument'] },
				},
			},
			{
				displayName: 'File Name',
				name: 'file_name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['uploadDocument'] },
				},
			},
			{
				displayName: 'File Type (MIME)',
				name: 'file_type',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['uploadDocument'] },
				},
			},
			{
				displayName: 'File Size (Bytes)',
				name: 'file_size',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: { operation: ['uploadDocument'] },
				},
			},

		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		let returnItems: INodeExecutionData[] = [];

		const itemIndex = 0;
		const operation = this.getNodeParameter('operation', itemIndex) as string;

		const credentials = await this.getCredentials('kimiyiApi');
		const apiKey = credentials.apiKey as string;

		// ========== UPLOAD DOCUMENT ==========
		if (operation === 'uploadDocument') {

			const platform  = this.getNodeParameter('platform', itemIndex) as string;
			const doc_link  = this.getNodeParameter('doc_link', itemIndex) as string;
			const file_name = this.getNodeParameter('file_name', itemIndex) as string;
			const file_type = this.getNodeParameter('file_type', itemIndex) as string;
			const file_size = this.getNodeParameter('file_size', itemIndex) as number;

			const body = {
				platform,
				doc_link,
				file_name,
				file_type,
				file_size,
			};

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: 'https://internalwebapi-dev.kimiyi.ai/api/Zapier/UploadFile',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': apiKey,
				},
				body,
				json: true,
			});

			returnItems.push({ json: response });
		}

		return this.prepareOutputData(returnItems);
	}
}
