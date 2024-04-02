import { Injectable } from '@nestjs/common';
import { RestClient } from 'src/providers/rest.client';

@Injectable()
export class MercadoLivreAuthRestClient extends RestClient {
  constructor() {
    super('https://api.mercadolibre.com');
  }
}
