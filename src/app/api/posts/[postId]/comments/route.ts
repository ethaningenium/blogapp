import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { verifyUser } from '@/libs/verifyToken';

export async function GET(request: NextRequest) {
  const params = new URL(request.url);
  const postId = Number(JSON.stringify(params).split('/').reverse()[1]);
  const comments = await prisma.comment.findMany({
    where: {
      PostId: postId,
    },
    include: {
      Author: true,
    },
  });
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const postId = params.postId;

  const { token, ...commentInfo } = await req.json();
  const AuthorId = verifyUser(token);
  if (!AuthorId) {
    return NextResponse.json({ message: 'Не удалось авторизировать' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: AuthorId,
    },
  });
  if (!user) {
    return NextResponse.json({ message: 'нету такого юзера' }, { status: 500 });
  }
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!post) {
    return NextResponse.json({ message: 'нету такого поста' }, { status: 500 });
  }
  const comment = {
    Text: commentInfo.Text,
    PostId: Number(postId),
    AuthorId,
  };

  const commentCreated = await prisma.comment.create({
    data: {
      ...comment,
    },
  });

  return NextResponse.json(
    {
      commentCreated,
    },
    { status: 200 },
  );
}
