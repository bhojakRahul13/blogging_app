import { Comments } from './commets.entity';
export const commentsProviders = [{ provide: 'CommentsRepository', useValue: Comments }];
