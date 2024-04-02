import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestClient } from 'src/providers/rest.client';

@Injectable()
export class MercadoLivreRestClient extends RestClient {
  private readonly appId: string;
  private readonly appSecret: string;
  private auth: {
    token: string;
    refreshToken: string;
    expiresIn: number;
  };

  constructor(
    private configService: ConfigService<{
      MERCADO_LIVRE: { appIdPadrao: string; appSecretPadrao: string };
    }>,
  ) {
    super('https://api.mercadolibre.com');

    const configMl = this.configService.get('MERCADO_LIVRE');
    this.appId = configMl.appIdPadrao;
    this.appSecret = configMl.appSecretPadrao;
    this.addMiddleware({
      beforeRequest: (config) => {
        config.headers!['Authorization'] = `Bearer ${this.auth.token}`;
        return config;
      },
    });
  }

  public setAuth({ token, refreshToken, expiresIn }: typeof this.auth) {
    this.auth = { token, refreshToken, expiresIn };
  }
}
