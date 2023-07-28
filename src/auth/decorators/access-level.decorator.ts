import { SetMetadata } from '@nestjs/common';
import { ACCESS_KEY, ACCESS_LEVEL } from 'src/constants';

export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_KEY, level);
