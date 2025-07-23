import React from 'react';

const Header = () => {
  return (
    <header className="bg-pawa-light-dark/50 backdrop-blur-sm p-4 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-blue-400">PAWA LLM</h1>
      </div>
    </header>
  );
};

export default Header;