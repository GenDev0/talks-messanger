import getConversationById from "@/actions/getConversationById";

import EmptyState from "@/components/empty-state";
import getMessages from "@/actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import MessagesForm from "./components/MessagesForm";

interface ConversationIdPageProps {
  params: {
    conversationId: string;
  };
}

const ConversationIdPage = async ({
  params: { conversationId },
}: ConversationIdPageProps) => {
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className='md:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='md:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body />
        <MessagesForm />
      </div>
    </div>
  );
};

export default ConversationIdPage;
