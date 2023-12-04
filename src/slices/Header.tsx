'use client';

import React, { useEffect } from 'react';
import { X, LucideIcon, LogIn, ArrowRightToLine } from 'lucide-react';
import Image from 'next/image';
import AvatarImage from 'public/avatar.jpg';
import Link from 'next/link';
import { UserSet } from '@/zustand/userStore';
import { getAuth } from '@/libs/getAuth';
import { userType } from '@/zustand/userStore';

const SearchInput = () => {
  return (
    <div className="w-96 max-w-xs h-10 relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full h-full rounded-lg pl-4 focus:outline-none bg-transparent border-[1px] border-green-200/60 placeholder:text-white/40 text-green-100"
      />
      <div className="absolute right-4 -translate-y-1/2 top-1/2">
        <X color="#F6FEF9" size={16} />
      </div>
    </div>
  );
};

const UserInHeader: React.FC<{ userData: userType }> = ({ userData }) => {
  return (
    <div className="flex gap-2">
      {userData.userEmail && (
        <Image
          src={AvatarImage}
          alt="AvatarImage"
          width="42"
          height="42"
          className="rounded-full border-[1px] border-white"
        />
      )}

      <div className="flex flex-col justify-center">
        <span className="text-xs text-green-50">{userData.userName}</span>
        <span className="text-xs text-green-200">{userData.userEmail}</span>
      </div>
    </div>
  );
};

const ButtonWhite: React.FC<{ Icon?: LucideIcon; Label: string }> = ({ Icon, Label }) => {
  return (
    <div className="h-9 bg-white rounded-lg px-4 justify-center items-center flex gap-2 select-none cursor-pointer duration-300 hover:bg-green-50">
      {Icon && <Icon size={16} />}
      <span className="text-sm">{Label}</span>
    </div>
  );
};

const ButtonOutlineWhite: React.FC<{ Icon?: LucideIcon; Label: string }> = ({ Icon, Label }) => {
  return (
    <div className="h-9 bg-transparent border-[1px] border-green-300 rounded-lg px-4 justify-center items-center flex gap-2 select-none cursor-pointer duration-300 hover:bg-white/5">
      {Icon && <Icon size={16} color="#ffffff" />}
      <span className="text-sm text-white">{Label}</span>
    </div>
  );
};

const Header = () => {
  const userData = UserSet((state) => state.user);
  const setUser = UserSet((state) => state.setUserToStore);
  useEffect(() => {
    if (!userData.userEmail) {
      name();
    }
    async function name() {
      const data = await getAuth();
      if (data) {
        setUser(data);
      }
    }
  }, [userData]);
  return (
    <header className=" w-full h-16 flex items-center bg-mygreen-500 px-24 justify-between">
      <Link href={'/'}>
        <span className="text-2xl text-white font-bold">Logo</span>
      </Link>

      <SearchInput />
      <div className="flex items-center gap-4">
        {userData.userEmail && <UserInHeader userData={userData} />}
        {!userData.userEmail && (
          <>
            <Link href="/auth/login">
              <ButtonWhite Icon={LogIn} Label="Войти" />
            </Link>
            <Link href="/auth/register">
              <ButtonOutlineWhite Icon={ArrowRightToLine} Label="Регистрация" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
