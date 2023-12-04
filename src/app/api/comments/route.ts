import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/libs/verifyToken';
import prisma from '@/libs/prisma';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const userId = verifyUser(token);
  if (!userId) return NextResponse.json({ message: 'not valid token' }, { status: 400 });
  const posts = await prisma.post.findMany({
    where: {
      AuthorId: userId,
    },
  });
  const postIds = posts.map((post) => {
    return post.id;
  });
  const comments = await prisma.comment.findMany({
    where: {
      PostId: {
        in: postIds,
      },
    },
    include: {
      Post: true,
      Author: true,
    },
  });
  return NextResponse.json(comments);
}
