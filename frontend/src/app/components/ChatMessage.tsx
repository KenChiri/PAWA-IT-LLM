import React from 'react';
import ReactMarkdown from 'react-markdown';
import {useTypewriter} from '../hooks/useTypewriter';


interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const typedContent = useTypewriter(message.content, 5);
  const displayText = isUser ? message.content : typedContent;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xl p-3 rounded-2xl ${
          isUser
            ? 'bg-[rgb(var(--pawa-dark))] text-white'
            : 'bg-[rgb(var(--pawa-light-dark)/0.5)] text-gray-200'
        }`}
      >
        {/* The 'prose' classes from Tailwind automatically style markdown */}
        <div className="prose prose-invert prose-p:my-2 prose-headings:my-2 prose-strong:text-white">
          <ReactMarkdown>{displayText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;