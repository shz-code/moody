"use client";
import { Send } from "lucide-react";
import { FC, useContext } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ isDisabled }) => {
  const { addMessage, handleInputChange } = useContext(ChatContext);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col ">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                rows={1}
                maxRows={4}
                autoFocus
                placeholder="Enter your question..."
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                onChange={(e) => handleInputChange(e)}
              />

              <Button
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatInput;
