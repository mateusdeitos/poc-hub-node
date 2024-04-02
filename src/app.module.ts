import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, registerAs } from '@nestjs/config';
import { IntegrationModule } from './modules/integration/integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        registerAs('MERCADO_LIVRE', () => ({
          appIdPadrao: process.env.MERCADOLIVRE_APP_PADRAO_ID,
          appSecretPadrao: process.env.MERCADOLIVRE_APP_PADRAO_SECRET,
        })),
      ],
    }),
    IntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
