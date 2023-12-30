'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import LogoImage from '@/assets/image/bglogo.jpeg';

function Login() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: 'hsla(240, 41.75%, 20.2%, 1)' }}
    >
      <Image src={LogoImage} width={300} alt="logo" priority/>
      <button
        onClick={() => signIn('google')}
        className="text-white font-bold text-xl animate-pulse mt-7 border rounded p-2"
      >
        Sing in to use Chat
      </button>
    </div>
  );
}

export default Login;
