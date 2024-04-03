import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIntegrationAuthDTO } from 'src/modules/integration.auth/dto/create.integration.auth.dto';
import { z } from 'zod';
import { TestAuthInterface } from '../../interfaces/test.auth.interface';
import { Auth } from './auth';
import { UserApi } from './user.api';

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

    this.userApi
      .getClient()
      .setAuth(
        new Auth(
          parsedData.token,
          parsedData.refreshToken,
          parsedData.expiresIn,
        ),
      );

    await this.userApi.getUser(userId);
  }
}
