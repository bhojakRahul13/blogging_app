import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/entities/user/user.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class UserIdValidation implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    (args.object as object)[relatedPropertyName];

    if (value == undefined || value == '') {
      return false;
    }
    
    return (await this.userService.userById(value)) == null ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value == undefined || args.value == '') {
      return `${args.property} is required`;
    }
    if (args.property == 'userId') {
      return "User Id not found";
    }
    return "User not found";
  }
}
