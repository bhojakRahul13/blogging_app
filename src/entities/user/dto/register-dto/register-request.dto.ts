import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString,  Matches, } from 'class-validator';
import { errorMessageInvalidEmail, errorUserNameInvalid, errorUserPasswordInvalid, errorUserPhoneInvalid } from 'src/shared/constants/errors/user';
import { regEmail, regPassword } from 'src/shared/constants/helpers/regex';
import { propsUserEmail, propsUserName, propsUserPassword, propsUserPhone } from 'src/shared/constants/swagger/api-property/user';

export class RegisterUserRequest {

  @ApiProperty(propsUserName)
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]{5,}$/, {
    message: errorUserNameInvalid
  })
  readonly userName: string;

  @ApiProperty(propsUserEmail)
  @IsNotEmpty()
  @Matches(regEmail, {
    message: errorMessageInvalidEmail.message 
  })
  readonly email: string;

  @ApiProperty(propsUserPassword)
  @IsNotEmpty()
  @Matches(regPassword,{message:errorUserPasswordInvalid})
  readonly password: string;

}
