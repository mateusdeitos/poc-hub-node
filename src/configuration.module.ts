import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { z } from 'zod';

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
      validate(config) {
        return z
          .object({
            MERCADOLIVRE_APP_PADRAO_ID: z.string(),
            MERCADOLIVRE_APP_PADRAO_SECRET: z.string(),
            PORT: z.string(),
            DB_HOST: z.string(),
            DB_PORT: z.string(),
            POSTGRES_USER: z.string(),
            POSTGRES_PASSWORD: z.string(),
            POSTGRES_DB: z.string(),
          })
          .parse(config, {
            errorMap: (issue) => {
              return {
                message: `Variável de ambiente ${issue.path.join('.')} não definida`,
              };
            },
          });
      },
    }),
  ],
})
export class ConfigurationModule {}
