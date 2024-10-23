import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

export type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface ContextProps {
  fileId: string;
  children: ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: ContextProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const res = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      const reader = res.body?.getReader();
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          console.log(new TextDecoder().decode(value));
        }
      }
      // if (!res.ok) throw new Error("Failed to send message");

      // console.log(res);

      // return res;
      // return res.body;
    },
  });

  const addMessage = () => sendMessage({ message });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
