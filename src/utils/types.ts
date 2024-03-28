import { PlatformRef } from 'src/modules/integration/enum/integrations';

export declare module TUtils {
  type OmitAutoGeneratedColumns<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

  type ParseCreateDTO<DTO> = DTO extends { platformRef: number }
    ? Omit<OmitAutoGeneratedColumns<DTO>, 'platformRef'> & {
        platformRef: PlatformRef;
      }
    : OmitAutoGeneratedColumns<DTO>;
}
