import { Global, Module, Scope } from '@nestjs/common';
import { ConfigurationModule } from './configuration.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { DrizzleDatabaseClient } from './providers/database.client';

@Global()
@Module({
  imports: [IntegrationModule, ConfigurationModule],
  providers: [
    DrizzleDatabaseClient,
    {
      provide: 'DB',
      scope: Scope.REQUEST,
      useFactory: async (dbClient: DrizzleDatabaseClient) => {
        const db = await dbClient.getDb();
        return db;
      },
      inject: [DrizzleDatabaseClient],
    },
  ],
  exports: [DrizzleDatabaseClient, 'DB'],
})
export class AppModule {}
