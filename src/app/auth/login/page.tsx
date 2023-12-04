'use client';

import { setToken } from '@/libs/TokenSetnGet';
import { UserSet } from '@/zustand/userStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const router = useRouter();
  const userSet = UserSet((state) => state.setUserToStore);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        Email: email,
        Password: password,
      });
      console.log(res.data);
      const data = res.data;
      userSet({
        userEmail: data.Email,
        userName: data.fullName,
      });
      setToken(data.token);
      router.push('/');
    } catch (error) {
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl justify-center flex flex-col items-center w-96 p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="text-2xl font-medium text-slate-700">Welcome back!</span>
      <form onSubmit={handleSubmit} className="w-80 mt-8 flex flex-col items-center">
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 mt-4 text-white px-8 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
function userSet(arg0: { userEmail: any; userName: any }) {
  throw new Error('Function not implemented.');
}
