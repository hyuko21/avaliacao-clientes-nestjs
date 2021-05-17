import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ErrorSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
    error: {
      type: 'string',
    },
  },
  required: ['statusCode', 'message', 'error'],
};
