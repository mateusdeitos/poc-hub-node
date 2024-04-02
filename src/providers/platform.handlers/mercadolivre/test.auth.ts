import { BadRequestException, Injectable } from '@nestjs/common';
import { TestAuthInterface } from '../../interfaces/test.auth.interface';
import { UserApi } from './user.api';
import { z } from 'zod';
import { CreateIntegrationAuthDTO } from 'src/modules/integration.auth/dto/create.integration.auth.dto';

@Injectable()
export class MercadoLivreTestAuth implements TestAuthInterface {
  constructor(private readonly userApi: UserApi) {}

  async run({ data, scope, type }: CreateIntegrationAuthDTO): Promise<void> {
    const parsedData = z
      .object({
        token: z.string(),
        refreshToken: z.string(),
        expiresIn: z.number(),
      })
      .parse(data);

    const { token } = parsedData;
    const userId = token.split('-').at(-1);
    if (!userId) {
      throw new BadRequestException('Invalid token');
    }

    this.userApi.getClient().setAuth(parsedData);

    await this.userApi.getUser(userId);
  }
}
