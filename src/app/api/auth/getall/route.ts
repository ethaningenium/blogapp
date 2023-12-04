import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { verifyUser } from '@/libs/verifyToken';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const userReq = await req.json();
  const userId = verifyUser(userReq.token);
  if (userId) {
    const users = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (users) {
      const { Password, ...userRes } = users;
      return NextResponse.json(userRes);
    }
    return NextResponse.json({ message: 'lol' }, { status: 400 });
  }
  return NextResponse.json({ message: 'lol' }, { status: 500 });
}
