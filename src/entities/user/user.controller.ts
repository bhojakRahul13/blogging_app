import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Request,
  UseFilters,
  Put,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  UserLoginResponse,
  UserRegisterResponse,
  userLogoutResponse,
} from 'src/shared/constants/swagger/api-response/user';
import { StaticAuthGuard } from 'src/shared/guards/auth.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { UserLoginRequestDTO } from './dto/login-dto/login-request.dto';
import { UserService } from './user.service';
import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import { RegisterUserRequest } from './dto/register-dto/register-request.dto';
import { UpdateUserRequestDTO } from './dto/update-user-dto/update-user-request.dto';
import { GetUserByIdRequestDTO } from './dto/getById/get-user-by-id-request.dto';
import { UpdateUserRoleRequestDTO } from './dto/update-role-dto/update-role-request.dto';

@ApiTags('Users')
@Controller('api/users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Register user
   * @Body  reqData
   * @returns
   */

  @Post('signup')
  @UseGuards(StaticAuthGuard)
  @ApiOkResponse(UserRegisterResponse)
  @HttpCode(201)
  public async registerUser(@Body() reqData: RegisterUserRequest) {
    return await this.userService.registerUser(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Login API
   * @param email:string,
   * @param passeord:string,
   * ? This API is used for Login purpose
   */
  @Post('signIn')
  @UseGuards(StaticAuthGuard)
  @ApiOkResponse(UserLoginResponse)
  @ApiOperation({ summary: 'Login User API' })
  @HttpCode(200)
  public async login(@Body() reqData: UserLoginRequestDTO) {
    return this.userService.login(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get user By Id API
   * @param userId:string
   * ? This API is used for Get user purpose
   */
  @Get('/me')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOperation({ summary: 'Get User profile API' })
  @HttpCode(200)
  public async getUserProfile(@Req() request: Request) {
    return this.userService.getUserProfileDetail(request['user']);
  }

  /**
   * --------------------------------------------------------------------------------
   *  User logout API
   */
  @Post('/logout')
  @ApiOperation({ summary: 'User logout API' })
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOkResponse(userLogoutResponse)
  @HttpCode(200)
  public async logout(@Req() request: Request) {
    return this.userService.userLogout(request['user']);
  }

  @Put(':userId')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOperation({ summary: 'Update User By Id API' })
  @ApiBody({
    type: UpdateUserRequestDTO,
    required: false,
  })
  @HttpCode(200)
  public async updateUser(
    @Param() param: GetUserByIdRequestDTO,
    @Body() reqData: UpdateUserRequestDTO,   
  ) {
    return this.userService.updateUser(param.userId, reqData);
  }

  @Put(':userId/role')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOperation({ summary: 'Update User By Id API' })
  @ApiBody({
    type: UpdateUserRequestDTO,
    required: false,
  })
  @HttpCode(200)
  public async updateUserRole(
    @Param() param: GetUserByIdRequestDTO,
    @Body() reqData: UpdateUserRoleRequestDTO,   
    @Req() request: Request
  ) {
    if(request['user'].role  != "admin"){
             throw new UnauthorizedException('Route access by  Admin only ! ');
    }
    return this.userService.updateUserRole(param.userId, reqData,request['user']);
  }

}
