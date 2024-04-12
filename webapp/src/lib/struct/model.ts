'use strict';

import { CredentialType } from 'struct/credential';

export const ModelList = {
	[CredentialType.OPENAI]: [
		'gpt-4-0125-preview',
		'gpt-3.5-turbo-0125',
		'gpt-3.5-turbo',
		'gpt-4',
		'gpt-4-1106-preview',
		'text-embedding-3-large',
		'text-embedding-3-small',
		'text-embedding-ada-002'
	],
	[CredentialType.FASTEMBED]: [
		'fast-bge-small-en',
		'fast-bge-small-en-v1.5',
		'fast-bge-base-en',
		'fast-bge-base-en-v1.5',
		'fast-all-MiniLM-L6-v2',
		'fast-multilingual-e5-large'
	],
	[CredentialType.OLLAMA]: [
		'mistral',
		'llama2',
		'llama2:13b',
		'llama2:70b',
		'llama2-uncensored',
		'codellama',
		'orca-mini',
		'vicuna',
		'nous-hermes',
		'nous-hermes:13b',
		'wizard-vicuna'
	],
	[CredentialType.HUGGING_FACE]: [
		'coming soon...'
	],
};

export const ModelEmbeddingLength = {
	'text-embedding-3-large': 3072,
	'text-embedding-3-small': 1536,
	'text-embedding-ada-002': 1536,
	'fast-bge-small-en': 384,
	'fast-bge-small-en-v1.5': 384,
	'fast-bge-base-en': 768,
	'fast-bge-base-en-v1.5': 786,
	'fast-bge-small-zh-v1.5': 512,
	'fast-all-MiniLM-L6-v2': 384,
	'fast-multilingual-e5-large': 1024,
};
