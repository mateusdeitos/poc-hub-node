import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { MercadoLivreRestClient } from './rest.client';

@Injectable()
export class UserApi {
  constructor(private readonly client: MercadoLivreRestClient) {}

  getClient() {
    return this.client;
  }

  async getUser(id: string) {
    try {
      const res = await this.client.get<{ body: { id: string } }>(
        `/users/${id}`,
        {
          attributes: 'id',
        },
      );

      return res.data;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
