import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserDTO {
  readonly id: number;

  readonly userName: string;

  readonly email: string;

  readonly role: string;

  readonly onlineStatus: string;

  readonly firstCreated: Date;

  readonly lastModified: Date;

  constructor(user: User) {
    this.id = user.id;
    this.userName = user.userName;
    this.email = user.email;
    this.role = user.role;
    this.onlineStatus = user.onlineStatus;
    this.lastModified = user.lastModified;
    this.firstCreated = user.firstCreated;
  }
}
