import { BadRequestException, Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe {
  constructor(private schema: ZodSchema) {}

  transform(value) {
    const result = this.schema.safeParse(value);
    if (result.success === false) {
      throw new BadRequestException(result.error.format());
    }

    return result.data;
  }
}
