import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth';
import { MercadoLivreAuthRestClient } from './auth.rest.client';

type ResponseRefreshToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

@Injectable()
export class AuthApi {
  constructor(
    private readonly client: MercadoLivreAuthRestClient,
    private configService: ConfigService<{
      MERCADO_LIVRE: { appIdPadrao: string; appSecretPadrao: string };
    }>,
  ) {}

  async refreshToken(refreshToken: string): Promise<Auth> {
    try {
      const res = await this.client.post<any, ResponseRefreshToken>(
        '/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: this.configService.get('MERCADO_LIVRE').appIdPadrao,
          client_secret:
            this.configService.get('MERCADO_LIVRE').appSecretPadrao,
          refresh_token: refreshToken,
        },
      );

      return new Auth(
        String(res.data.access_token),
        String(res.data.refresh_token),
        Number(res.data.expires_in) * 1000 + Date.now(),
      );
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
