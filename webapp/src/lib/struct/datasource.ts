'use strict';

import { ObjectId } from 'mongodb';

export type DatasourceStream = {
    syncMode: string; //TODO: enum to match airbyte api
    name: string;
};

export type DatasourceConnectionSettings = {
    syncCatalog: any; //TODO
    scheduleType: string; //TODO: allow scheduling
    namespaceDefinition: string;
    namespaceFormat: string | null;
    nonBreakingSchemaUpdatesBehavior: string;
    prefix: string | null;
    name: string;
    sourceId: string;
    destinationId: string;
    status: string; //TODO: enum to match airbyte api, and allow creating in paused state
};

export type DatasourceChunkStrategy = 'semantic' | 'character';

export type Datasource = {
    _id?: ObjectId;
    orgId?: ObjectId;
    teamId?: ObjectId;
    name: string;
    originalName: string;
    gcsFilename: string;
    sourceType: string;
    sourceId: string;
    destinationId: string;
    workspaceId: string;
    connectionId: string;
    connectionSettings?: DatasourceConnectionSettings;
    createdDate: Date;
    lastSyncedDate?: Date | null; //Note: null = never synced
    discoveredSchema?: any;
    chunkStrategy?: DatasourceChunkStrategy;
    chunkCharacter?: string | null;
    modelId?: ObjectId; //model id of embedding model in models collection
};
