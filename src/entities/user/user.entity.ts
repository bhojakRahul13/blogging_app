import {
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import {  UserRole } from "src/shared/enum/role";
import { BlogPost } from "../blog-post/blog.entity";
import { Comments } from "../commets/commets.entity";

@Table({
  tableName: "users",
  timestamps: false,
  freezeTableName: true,
})
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
    allowNull: false,
  })
  userName: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;


  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(UserRole)),
    comment: "admin,editor, regular",
    defaultValue: UserRole.REGULAR,
  })
  role: UserRole;

  @Column({
    type: DataType.ENUM,
    values: ["1", "2"],
    allowNull: true,
    comment: "1: online, 2: offline",
    defaultValue: "2",
  })
  onlineStatus: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn("now"),
  })
  firstCreated: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn("now"),
  })
  lastModified: Date;

  @HasMany(() => BlogPost)
  bogPosts: BlogPost[];

  @HasMany(() => Comments)
  comments: Comments[];
}
