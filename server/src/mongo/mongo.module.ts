import { Db, MongoClient } from 'mongodb';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

function getConnectionString(config) {
    // assume a connection string in format: service['mongodb','mongodb+srv']://location
    const mongoUrl = config.get('MONGO_URL');
    const service = mongoUrl.substring(0, mongoUrl.indexOf('://'));
    const location = mongoUrl.substring(service.length + 3);

    const username = config.get('MONGO_USERNAME');
    const password = config.get('MONGO_PASSWORD');

    return `${service}://${username}:${password}@${location}`;
}

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: async (configService: ConfigService): Promise<Db> => {
                try {
                    const client = await MongoClient.connect(
                        getConnectionString(configService),
                    );
                    return client.db(configService.get('MONGO_DATABASE'));
                } catch (e) {
                    throw e;
                }
            },
            inject: [ConfigService],
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class MongoModule {}
