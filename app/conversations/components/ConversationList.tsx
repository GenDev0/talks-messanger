"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();
  const [items, setItems] = useState<FullConversationType[]>(initialItems);

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 md:pb-0 md:left-20 md:w-80 md:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-2xl font-bold text-neutral-800 '>Messages</div>
          <div className='rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {/* List of Conversations */}
        {!items.length && (
          <p>
            <em>No Conversations found.</em>
          </p>
        )}
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
