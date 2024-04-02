import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';

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
  ],
})
export class ConfigurationModule {}
