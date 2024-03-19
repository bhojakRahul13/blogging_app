import { BlogPost } from './blog.entity';
export const blogPostProviders = [{ provide: 'BlogPostRepository', useValue: BlogPost }];
