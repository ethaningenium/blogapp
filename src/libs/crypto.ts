import bcrypt from 'bcrypt';

export async function PassHash(password: string) {
  const pass = await bcrypt.hash(password, 10);
  return pass;
}

export async function PassCompare(passIn: string, hashedpass: string) {
  const pass = await bcrypt.compare(passIn, hashedpass);
  return pass;
}
