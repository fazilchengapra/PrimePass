import React from 'react';

const AuthFooter = ({ isLogin, onToggle }) => (
  <div className="text-sm text-[#535862] text-center">
    {isLogin ? "Don't have an account? " : "Already have an account? "}
    <span
      className="text-sm font-bold text-black cursor-pointer"
      onClick={() => {
        onToggle(!isLogin)
      }}
    >
      {isLogin ? "Sign Up" : "Log In"}
    </span>
  </div>
);

export default AuthFooter;