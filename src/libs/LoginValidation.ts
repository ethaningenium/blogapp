import { z } from 'zod';

const User = z.object({
  Email: z.string().email(),
  Password: z.string().min(8),
});

export type UserType = z.infer<typeof User>;

export function loginValidate(params: any) {
  try {
    User.parse(params);
    return true;
  } catch (error) {
    return false;
  }
}
