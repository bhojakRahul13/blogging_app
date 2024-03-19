import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Tags } from "../tags/tags.entity";

@Table({
  tableName: "blogPostTags",
  timestamps: false,
  freezeTableName: true,
})
export class BlogPostTags  extends Model<BlogPostTags>{
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column
  @ForeignKey(() => BlogPost)
  blogPostId: number;

  @Column
  @ForeignKey(() => Tags)
  tagId: number;

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


}
