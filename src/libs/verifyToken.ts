import jwt from 'jsonwebtoken';
export function verifyUser(token: string) {
  try {
    const user = jwt.verify(token, 'secret003');
    if (typeof user !== 'string') {
      return user.id as number;
    }
    return false;
  } catch (error) {
    return false;
  }
}
