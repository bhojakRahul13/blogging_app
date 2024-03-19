import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { Op, where } from "sequelize";
import {
  emailInUseError,
  errorEmailExist,
  errorPhoneExist,
  errorUserName,
} from "src/shared/constants/errors/user";
import {
  UserDetailSuccessMessage,
  loginSuccessMessage,
  logoutMessage,
  registerSuccessMessage,
  successMessage,
} from "src/shared/constants/helpers/message";
import { HelperService } from "src/shared/services/helper";
import { UserLoginRequestDTO } from "./dto/login-dto/login-request.dto";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.entity";
import { config } from "src/config";
import { RegisterUserRequest } from "./dto/register-dto/register-request.dto";
import * as bcrypt from "bcrypt";
import { UserLoginResponseDTO } from "./dto/login-dto/login-response.dto";
import { UserRegisterResponseDTO } from "./dto/register-dto/register-response.dto";
import { UserProfileResponseDTO } from "./dto/getById/response.dto";
import { HttpStatusCode } from "axios";
import { UserLogoutResponseDTO } from "./dto/user-logout-dto/user-logout-response.dto";
import { UpdateUserRequestDTO } from "./dto/update-user-dto/update-user-request.dto";
import { UpdateUserResponseDTO } from "./dto/update-user-dto/update-user-response.dto";
import { UpdateUserRoleRequestDTO } from "./dto/update-role-dto/update-role-request.dto";
import { UpdateUserRoleResponseDTO } from "./dto/update-role-dto/update-role-response.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: typeof User,
    private readonly helperService: HelperService
  ) {}

  /**
   * User registartion
   * @param reqData
   * @returns
   */
  registerUser = async (reqData: RegisterUserRequest) => {
    const findEmailExist = await this.userRepository.findOne<User>({
      where: {
        email: reqData.email,
      },
    });

    if (findEmailExist) {
      throw new HttpException(errorEmailExist, HttpStatus.FOUND);
    }

    const findUserNameExist = await this.userRepository.findOne<User>({
      where: {
        userName: reqData.userName,
      },
    });

    if (findUserNameExist) {
      throw new HttpException(errorUserName, HttpStatus.FOUND);
    }

    const registerObj = {
      userName: reqData.userName,
      email: reqData.email ? reqData.email : null,
      password: bcrypt.hashSync(reqData.password, await bcrypt.genSalt()),
    };
    const createdUser = await this.userRepository.create<User>(registerObj);

    const token = sign(
      {
        id: createdUser.id,
        userName: createdUser.userName,
        email: createdUser?.email,
        role: createdUser?.role,
      },
      config().JSON_WEB_TOKEN_SECRET_KEY
    );

    const userData = await this.userRepository.findOne<User>({
      where: { id: createdUser.id },
    });

    return new UserRegisterResponseDTO(
      HttpStatus.CREATED,
      new UserDTO(userData),
      "Bearer " + token,
      registerSuccessMessage
    );
  };

  /**
   * * Login Function
   * @param email:string
   * ? This API is used for Login purpose
   */
  login = async (reqData: UserLoginRequestDTO) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { email: reqData.email },
      });

      /** Update online status to true */

      await this.userRepository.update(
        { onlineStatus: "1" },
        {
          where: {
            id: userData.id,
          },
        }
      );

      const token = sign(
        {
          id: userData.id,
          userName: userData.userName,
          email: userData?.email,
          role: userData?.role,
        },
        config().JSON_WEB_TOKEN_SECRET_KEY
      );

      return new UserLoginResponseDTO(
        HttpStatus.OK,
        new UserDTO(userData),
        "Bearer " + token,
        loginSuccessMessage
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /**
   * * Retrieving user  Function
   * ? This API is used for Retrieving User  purpose
   */
  getUserProfileDetail = async (user: User) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { id: user.id },
      });

      return new UserProfileResponseDTO(
        HttpStatus.OK,
        userData,
        UserDetailSuccessMessage
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /**
   * * Check User Exist By Email Function
   * @param email:string,
   * ? This API is used for user exist API
   */
  userExist = async (email: string): Promise<User> => {
    const userData = await this.userRepository.findOne<User>({
      where: { email: email },
    });

    if (userData) {
      return userData;
    } else {
      return null;
    }
  };


    /**
   * * Check User Exist By Email Function
   * @param email:string,
   * ? This API is used for user exist API
   */
    userById = async (id: string): Promise<User> => {
      const userData = await this.userRepository.findOne<User>({
        where: { id: id },
      });
  
      if (userData) {
        return userData;
      } else {
        return null;
      }
    };
  
  /**
   * * Retrieving user by phone Function
   * @param phone:string,
   * ? This API is used for Retrieving User by phone purpose
   */
  getUserByUserName = async (
    userName: string,
    type?: string,
    userId?: string
  ): Promise<User> => {
    try {
      let whereQuery = {};

      if (typeof type != "undefined" && type == "update") {
        whereQuery = {
          where: { userName: userName, id: { [Op.ne]: userId } },
        };
      } else {
        whereQuery = {
          where: { userName: userName },
        };
      }

      const userData = await this.userRepository.findOne<User>(whereQuery);

      if (userData == null) {
        return null;
      }

      return userData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /** Jwt purpose  */
  isValidateUser = async (userId: string | number) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { id: userId },
      });

      return userData || null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  userLogout = async (reqData: User) => {
    /** Update online status to offline */
    await this.userRepository.update(
      { onlineStatus: "2" },
      {
        where: {
          id: reqData.id,
        },
      }
    );
    return new UserLogoutResponseDTO(HttpStatus.OK, {}, logoutMessage);
  };

  updateUser = async (userId: string, reqData: UpdateUserRequestDTO) => {
    try {
      const updateRecord = {};
      /** Email Validation */
      if (typeof reqData.email != "undefined" && reqData.email != "") {
        const phoneExist = await this.getUserByEmail(
          reqData.email,
          "update",
          userId
        );

        if (phoneExist) {
          throw new BadRequestException(emailInUseError);
        }

        updateRecord["email"] = reqData.email;
      }

      /** User name Validation */
      if (typeof reqData.userName != "undefined" && reqData.userName != "") {
        const phoneExist = await this.getUserByUserName(
          reqData.userName,
          "update",
          userId
        );

        if (phoneExist) {
          throw new BadRequestException(errorUserName);
        }

        updateRecord["userName"] = reqData.userName;
      }

      await this.userRepository.update(updateRecord, { where: { id: userId } });

      const response = await this.userById (userId);
      
      return new UpdateUserResponseDTO(
        HttpStatus.OK,
        new UserDTO(response),
        successMessage
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /**
   * Admin Update user role 
   */
  updateUserRole = async (userId: string, reqData: UpdateUserRoleRequestDTO,user:User) => {
    try {
      const updateRecord = {};
      /** User name Validation */
      if (typeof reqData.role != "undefined") {
        updateRecord["role"] = reqData.role;
      }

      await this.userRepository.update(updateRecord, { where: { id: userId } });

      const response = await this.userById (userId);
      
      return new UpdateUserRoleResponseDTO(
        HttpStatus.OK,
        new UserDTO(response),
        successMessage
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * * Retrieving user by phone Function
   * @param phone:string,
   * ? This API is used for Retrieving User by phone purpose
   */
  getUserByEmail = async (
    email: string,
    type?: string,
    userId?: string
  ): Promise<User> => {
    try {
      let whereQuery = {};

      if (typeof type != "undefined" && type == "update") {
        whereQuery = {
          where: { email: email, id: { [Op.ne]: userId } },
        };
      } else {
        whereQuery = {
          where: { email: email },
        };
      }

      const userData = await this.userRepository.findOne<User>(whereQuery);

      if (userData == null) {
        return null;
      }

      return userData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
