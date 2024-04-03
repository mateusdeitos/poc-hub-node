import { Global, Module, Scope } from '@nestjs/common';
import { ConfigurationModule } from './configuration.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { DrizzleDatabaseClient } from './providers/database.client';
import { IntegrationAuthModule } from './modules/integration.auth/integration.auth.module';

@Global()
@Module({
  imports: [IntegrationModule, IntegrationAuthModule, ConfigurationModule],
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
