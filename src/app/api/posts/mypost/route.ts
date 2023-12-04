import prisma from '@/libs/prisma';
import { verifyUser } from '@/libs/verifyToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const userId = verifyUser(token);
  if (!userId) return NextResponse.json({ message: 'not valid token' }, { status: 400 });
  const posts = await prisma.post.findMany({
    where: {
      AuthorId: userId,
    },
  });
  return NextResponse.json(posts);
}
