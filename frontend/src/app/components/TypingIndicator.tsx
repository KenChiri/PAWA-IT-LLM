import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-pawa-light-dark p-3 rounded-2xl flex items-center space-x-2">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;