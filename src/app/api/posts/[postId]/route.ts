import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const postId = params.postId;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!post) return NextResponse.json({ message: 'нету накого поста' }, { status: 400 });
  return NextResponse.json(post);
}
