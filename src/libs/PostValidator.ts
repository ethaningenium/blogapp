import { z } from 'zod';

const Post = z.object({
  Title: z.string().min(3),
  Content: z.string().min(3),
  Image: z.string().url(),
  AuthorId: z.number(),
});

export type PostType = z.infer<typeof Post>;

export function postValidate(params: any) {
  try {
    Post.parse(params);
    return true;
  } catch (error) {
    return false;
  }
}
