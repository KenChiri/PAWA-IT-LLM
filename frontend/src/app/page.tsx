"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, gql, ApolloProvider } from "@apollo/client";
import createApolloClient from "./lib/apollo-client";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatMessage from "./components/ChatMessage";
import TypingIndicator from "./components/TypingIndicator";
import { v4 as uuidv4 } from "uuid";


// Define the GraphQL mutation
const ASK_QUESTION = gql`
  mutation AskQuestion($question: String!, $history: [ChatMessageInput!]!) {
    askQuestion(input: { question: $question, history: $history }) {
      answer
      history {
        role
        content
      }
    }
  }
`;

// Define the types for our chat messages
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

// Main Chat Component
function Chat() {
  const [chats, setChats] = useState<Record<string, ChatSession>>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [askQuestion, { loading }] = useMutation(ASK_QUESTION, {
    onCompleted: (data) => {
      //UUpdates the messages for the currently active chat'
      if (activeChatId) {
        setChats(prev => ({
          ...prev,
          [activeChatId]: {
            ...prev[activeChatId],
            messages: data.askQuestion.history
          }
        }));
      }
    },
    onError: (error) => {
      // Handle errors gracefully
      if (activeChatId) {
        const errorMessage: Message = { role: 'assistant', content: `Sorry, an error occurred: ${error.message}` };
        setChats(prev => ({
          ...prev,
          [activeChatId]: {
            ...prev[activeChatId],
            messages: [...prev[activeChatId].messages, errorMessage]
          }
        }));
      }
    }
  });


  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [chatHistory, activeChatId, loading]);

  const handleNewChat = () => {
    const newId = uuidv4();
    const newChat: ChatSession = {
      id: newId,
      title: "New Chat",
      messages: []
    };
    setChats(prev => ({ ...prev, [newId]: newChat }));
    setActiveChatId(newId);
  };

  useEffect(() => {
    if (Object.keys(chats).length === 0) {
      handleNewChat();
    }
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !loading && activeChatId) {
      const activeChat = chats[activeChatId];
      const historyForApi = activeChat.messages;
      const userMessage: Message = { role: 'user', content: question };



      setChats(prev => ({
        ...prev,
        [activeChatId]: {
          ...activeChat,
          // If this is the first message, set it as the chat title
          title: activeChat.messages.length === 0 ? question : activeChat.title,
          messages: [...activeChat.messages, userMessage],
        }
      }));

      askQuestion({ variables: { question, history: historyForApi } });
      setQuestion("");
    }
  };

  const activeChat = activeChatId ? chats[activeChatId] : null;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar 
          chats={Object.values(chats)}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={(id) => setActiveChatId(id)}
        />
        {/*Main Chat Container */}
        <div className="flex-1 flex flex-col relative min-h-0">
          {/* Glowing Background Image */}
          <div 
             className="absolute inset-0 bg-contain bg-center  bg-no-repeat z-0 opacity-10"
             style={{ backgroundImage: "url('/glowing_image.jpg')" }}
          ></div>

          {/* Content layer, with padding*/}
          <div className="relative flex-1 flex flex-col p-10 z-10 min-h-0">
            {/* <div className="flex-1 overflow-hidden p-4 "></div> */}

            {/*Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pb-4">

             {activeChat ? (
                activeChat.messages.map((msg, index) => <ChatMessage key={index} message={msg} />)
              ) : (
                <div className="text-center text-gray-400">Select a chat or start a new one.</div>
              )}
              {loading && <TypingIndicator />}

          </div>

          {/* Chat Input */}
          <div className="flex-shrink-0 p-4 md:p-6 pt-0">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask the PAWA AI anything..."
                className="flex-1 p-4 bg-gray-900 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-800 text-white"
                disabled={loading || !activeChatId}
              />
              <button
                type="submit"
                className="p-4 bg-zinc-800 text-white rounded-full disabled:bg-sky-800 disabled:cursor-not-allowed hover:bg-sky-800 transition-colors"
                disabled={loading || !question.trim() || !activeChatId}
              >
                Send
              </button>
            </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// The final page component that wraps the Chat with the Apollo Provider
export default function Page() {
    const client = createApolloClient();
    return (
        <ApolloProvider client={client}>
            <Chat />
        </ApolloProvider>
    );
}