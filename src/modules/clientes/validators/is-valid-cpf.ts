import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmpty,
} from 'class-validator';

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: (args: ValidationArguments) => {
          const message = `${args.property} must be a valid cpf number`;
          if (validationOptions?.each || Array.isArray(args.value)) {
            return `each value of ${message}`;
          }
          return message;
        },
      },
      validator: {
        validate(value: string) {
          return !isEmpty(value) && DocumentUtil.isValidCpf(value);
        },
      },
    });
  };
}

class DocumentUtil {
  // CPF
  private static WEIGHT_CPF = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  private static recursiveSum(
    weight: number[],
    chars: string[],
    num: number,
  ): number {
    if (num <= 0) return 0;
    const charIndex = num - 1;
    const weightIndex = weight.length > chars.length ? num : charIndex;
    return (
      this.recursiveSum(weight, chars, charIndex) +
      Number(chars[charIndex]) * weight[weightIndex]
    );
  }

  private static calculate(str: string, weight: number[]): number {
    const chars = str.split('');
    let sum = this.recursiveSum(weight, chars, chars.length);
    sum = 11 - (sum % 11);
    return sum > 9 ? 0 : sum;
  }

  private static checkEquals(
    value: string,
    length: number,
    weight: number[],
  ): boolean {
    const number = value.substring(0, length);
    const digit1 = this.calculate(number, weight);
    const digit2 = this.calculate(number + digit1, weight);
    return value === `${number}${digit1}${digit2}`;
  }

  /**
   * Validates CPF
   *
   * @param cpf
   * @return
   */
  public static isValidCpf(cpf: string): boolean {
    if (
      cpf === null ||
      !cpf.match(/^\d{3}[\.]?\d{3}[\.]?\d{3}[-]?\d{2}$/) ||
      !cpf.match(/\d{11}/) ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
    return this.checkEquals(cpf, 9, this.WEIGHT_CPF);
  }
}
