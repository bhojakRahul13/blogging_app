import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { UserController } from "./user.controller";
import { userProviders } from "./user.provider";
import { UserService } from "./user.service";
import { IsEmailExistOrPasswordMatchConstraint } from "src/shared/validate/email-exist-validation";
import { UserIdValidation } from "src/shared/validate/user-id-validation";
@Module({
  imports: [SharedModule],
  providers: [
    UserService,
    IsEmailExistOrPasswordMatchConstraint,
    UserIdValidation,
    ...userProviders,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
