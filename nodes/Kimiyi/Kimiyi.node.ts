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
				default: 'addDocument',
				options: [
					{
						name: 'Add New Document',
						value: 'addDocument',
					},
					{
						name: 'Update Existing Document',
						value: 'updateDocument',
					},
					{
						name: 'Add & Update Document',
						value: 'addUpdateDocument',
					},
					{
						name: 'Auto Reply Message',
						value: 'autoReplyMessage',
					},
				],
			},
			{
				displayName: 'Document Name',
				name: 'documentName',
				type: 'string',
				default: '',
				description: 'Name of the document to create',
				displayOptions: {
					show: {
						operation: ['addDocument'],
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Text content of the document',
				displayOptions: {
					show: {
						operation: ['addDocument'],
					},
				},
			},
			{
				displayName: 'File URL (Optional)',
				name: 'fileUrl',
				type: 'string',
				default: '',
				description: 'URL of a file to include in the document (optional)',
				displayOptions: {
					show: {
						operation: ['addDocument'],
					},
				},
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
