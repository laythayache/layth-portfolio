import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ChatContextValue {
  isOpen: boolean;
  isVoiceMode: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  openVoiceChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const openChat = useCallback(() => {
    setIsVoiceMode(false);
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsVoiceMode(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setIsVoiceMode(false);
      return !prev;
    });
  }, []);

  const openVoiceChat = useCallback(() => {
    setIsVoiceMode(true);
    setIsOpen(true);
  }, []);

  return (
    <ChatContext.Provider
      value={{ isOpen, isVoiceMode, openChat, closeChat, toggleChat, openVoiceChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
