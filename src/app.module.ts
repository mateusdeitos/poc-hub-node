import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration.module';
import { IntegrationModule } from './modules/integration/integration.module';

@Module({
  imports: [IntegrationModule, ConfigurationModule],
})
export class AppModule {}
