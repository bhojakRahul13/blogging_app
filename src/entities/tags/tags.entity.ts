import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { BlogPost } from "../blog-post/blog.entity";
import { BlogPostTags } from "../post-tags/post-tags.entity";

@Table({
  tableName: "tags",
  timestamps: false,
  freezeTableName: true,
})
export class Tags extends Model<Tags> {
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
  name: string;

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

  @BelongsToMany(() => BlogPost, () => BlogPostTags)
  blogPosts: BlogPost[];
}
