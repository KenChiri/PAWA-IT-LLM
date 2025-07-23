import React from 'react';

type ChatSession = {
  id: string;
  title: string;
};

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onNewChat, onSelectChat }) => {
  return (

    <aside className="hidden md:block w-64 bg-zinc-950/50 p-4 rounded-lg">
      <button
        onClick={onNewChat}
        className="w-full text-left p-3 mb-2 rounded-lg border border-gray-600 hover:bg-[rgb(var(--pawa-light-dark))]"
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-3 rounded-lg cursor-pointer truncate text-sm ${
              chat.id === activeChatId ? 'bg-[rgb(var(--pawa-light-dark))]' : 'hover:bg-[rgb(var(--pawa-light-dark))]'
            }`}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;