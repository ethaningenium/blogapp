import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prisma';
import { PassCompare } from '@/libs/crypto';
import jwt from 'jsonwebtoken';
import { loginValidate, UserType } from '@/libs/LoginValidation';

export async function POST(req: NextRequest) {
  const userInfo = (await req.json()) as UserType;
  //Валидация
  const isValid = loginValidate(userInfo);
  if (!isValid) {
    return NextResponse.json({ message: 'Не удалось валидировать' }, { status: 400 });
  }
  //поиск юзера
  const user = await prisma.user.findUnique({
    where: {
      Email: userInfo.Email,
    },
  });
  if (!user) {
    return NextResponse.json({ message: 'Не удалось найти юзера' }, { status: 400 });
  }

  //Реально ли пароль
  const isValidPass = await PassCompare(userInfo.Password, user.Password);
  if (!isValidPass) {
    return NextResponse.json({ message: 'Пароль неверный' }, { status: 400 });
  }

  //Создание JWT
  const { Password, ...userSafe } = user;
  const token = jwt.sign(userSafe, 'secret003');

  //Отправка данных в front
  return NextResponse.json({
    ...userSafe,
    token: token,
  });
}
