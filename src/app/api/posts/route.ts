import prisma from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyUser } from '@/libs/verifyToken';
import { postValidate } from '@/libs/PostValidator';

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { token, ...postInfo } = await req.json();
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
  const post = {
    Title: postInfo.Title,
    Content: postInfo.Content,
    Image: postInfo.Image,
    AuthorId,
  };

  if (!postValidate(post)) {
    return NextResponse.json({ message: 'пост не правильный' }, { status: 400 });
  }

  const postCreated = await prisma.post.create({
    data: {
      ...post,
    },
  });

  return NextResponse.json({ id: postCreated.id }, { status: 200 });
}
