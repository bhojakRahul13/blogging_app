import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.entity";
import { BlogPost } from "../blog-post/blog.entity";

@Table({
  tableName: "comments",
  timestamps: false,
  freezeTableName: true,
})
export class Comments  extends Model<Comments>{
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  content: string;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column
  @ForeignKey(() => BlogPost)
  blogPostId: number;

  @Column
  @ForeignKey(() => Comments)
  parentId: number;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => BlogPost)
  blogPost: BlogPost;

  @BelongsTo(() => Comments)
  parent: Comments;


  @HasMany(() => Comments)
  replies: Comments[];
}
