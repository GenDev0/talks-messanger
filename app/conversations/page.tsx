"use client";

import EmptyState from "@/components/empty-state";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";

interface ConversationsPageProps {}

const ConversationsPage = (props: ConversationsPageProps) => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("md:pl-80 h-full md:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
