import { Injectable } from '@nestjs/common';
import { RestClient } from 'src/providers/rest.client';
import { Auth } from './auth';
import { AuthApi } from './auth.api';

type ExpectedAuth = {
  token: string;
  refreshToken: string;
  expiresIn: number;
};

@Injectable()
export class MercadoLivreRestClient extends RestClient {
  private auth: Auth;

  constructor(private authApi: AuthApi) {
    super('https://api.mercadolibre.com');

    this.addMiddleware({
      beforeRequest: async (config) => {
        if (this.auth.isExpired()) {
          this.setAuth(
            await this.authApi.refreshToken(this.auth.getRefreshToken()),
          );
        }
        config.headers!['Authorization'] = `Bearer ${this.auth.getToken()}`;
        return config;
      },
    });
  }

  public setAuth(auth: Auth) {
    this.auth = auth;
  }
}
