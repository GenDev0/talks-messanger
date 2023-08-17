"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import MessageBox from "./MessageBox";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
};

export default Body;
