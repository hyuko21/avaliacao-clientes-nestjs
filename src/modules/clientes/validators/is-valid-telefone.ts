import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmpty,
} from 'class-validator';

export function IsValidTelefone(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidTelefone',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: (args: ValidationArguments) => {
          const message = `${args.property} must be a valid telefone number`;
          if (validationOptions?.each || Array.isArray(args.value)) {
            return `each value of ${message}`;
          }
          return message;
        },
      },
      validator: {
        validate(value: string) {
          return !isEmpty(value) && TELEFONE_REGX.test(value);
        },
      },
    });
  };
}

const TELEFONE_REGX =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
