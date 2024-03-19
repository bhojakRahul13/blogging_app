import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { HelperService } from "src/shared/services/helper";
import { User } from "../user/user.entity";
import { BlogPost } from "./blog.entity";
import { CreateBlogPostRequest } from "./dto/blog-post-dto/blog-post-request.dto";
import { BlogPostResponseDTO } from "./dto/blog-post-dto/blog-post-response.dto";
import { BlogPostDTO } from "./dto/blog.dto";

@Injectable()
export class BlogPostService {
  constructor(
    @Inject("BlogPostRepository")
    private readonly blogPostRepository: typeof BlogPost,
  ) {}

  /**
   * Post create
   * @param reqData
   * @returns
   */
  createPost = async (reqData: CreateBlogPostRequest, user: User) => {
    const findTitleExist = await this.blogPostRepository.findOne<BlogPost>({
      where: {
        title: reqData.title,
      },
    });

    if (findTitleExist) {
      throw new HttpException("Post title  already in use", HttpStatus.FOUND);
    }

    const registerObj = {
      title: reqData.title,
      content: reqData.content,
      author: reqData.author,
      userId: user.id,
      coverImage: reqData.coverImage,
      publicationDate: reqData.publicationDate,
    };
    const postData = await this.blogPostRepository.create(registerObj);

    console.log(postData);
    
    return new BlogPostResponseDTO(
      HttpStatus.CREATED,
      new BlogPostDTO(postData),
      "post add success"
    );
  };

  /**
   * * Check User Exist By Email Function
   * @param email:string,
   * ? This API is used for user exist API
   */
  // blogPostById = async (id: string): Promise<BlogPost> => {
  //   const postData = await this.postRepository.findOne({
  //     where: { id: id },
  //   });

  //   if (postData) {
  //     return postData;
  //   } else {
  //     return null;
  //   }
  // };
}
