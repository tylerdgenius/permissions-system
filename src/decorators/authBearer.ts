// swagger.decorator.ts

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthBearer() {
  return applyDecorators(ApiBearerAuth());
}
