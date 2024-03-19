import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Comments } from "../commets/commets.entity";
import { BlogPost } from "../blog-post/blog.entity";

@Table({
  tableName: "reaction",
  timestamps: false,
  freezeTableName: true,
})
export class Reaction  extends Model<Reaction>{
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM('Like', 'Dislike'),
    allowNull: false,
  })
  type: 'Like' | 'Dislike';

  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column
  @ForeignKey(() => BlogPost)
  blogPostId: number;

  @Column
  @ForeignKey(() => Comments)
  commentId: number;

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
  Comments: Comments;
}
