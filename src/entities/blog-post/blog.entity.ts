import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Comments } from "../commets/commets.entity";
import { Tags } from "../tags/tags.entity";
import { BlogPostTags } from "../post-tags/post-tags.entity";

@Table({
  tableName: "blogPost",
  timestamps: false,
  freezeTableName: true,
})
export class BlogPost  extends Model<BlogPost>{
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
  title: string;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  content: string;

  @Column({
    allowNull: false,
  })
  author: string;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column({
  allowNull: true,
  })
  coverImage: string;

  @Column
  publicationDate: Date;

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

  @BelongsToMany(() => Tags, () => BlogPostTags)
  tags: Tags[];
}
