import { Button } from '@radix-ui/themes';
import React from 'react';

const GoogleAuthButton = ({ isLogin, onClick }) => (
  <Button
    color="gray"
    variant="outline"
    size="2"
    className="bg-white w-full rounded-md text-[#414651] outline-gray-400 cursor-pointer"
    onClick={onClick}
  >
    <img src="/asset/googleIcon.svg" alt="google" className="object-cover h-5 w-5" />
    Sign {isLogin ? 'in' : 'up'} with Google
  </Button>
);

export default GoogleAuthButton;