import { NextRequest, NextResponse } from 'next/server';
import { registerValidate, UserType } from '@/libs/RegisterValidation';
import prisma from '@/libs/prisma';
import { PassHash } from '@/libs/crypto';
import jwt from 'jsonwebtoken';

//Регистрация
export async function POST(req: NextRequest) {
  //получение информации
  const userInfo = (await req.json()) as UserType;

  //Валидация
  const isValid = registerValidate(userInfo);
  if (!isValid) {
    return NextResponse.json({ message: 'Не удалось валидировать' }, { status: 400 });
  }

  //Шифрование пароля
  const passHashed = await PassHash(userInfo.Password);

  //Создание юзера
  const createUser = async () => {
    try {
      const user = await prisma.user.create({
        data: {
          fullName: userInfo.fullName,
          Email: userInfo.Email,
          Password: passHashed,
        },
      });
      return user;
    } catch (error) {
      return false;
    }
  };
  const user = await createUser();
  if (!user) {
    return NextResponse.json({ message: 'Не удалось создать юзера' }, { status: 500 });
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
