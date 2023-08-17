import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return null;
  }
  try {
    const conversation = prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!conversation) {
      return null;
    }
    return conversation;
  } catch (error) {
    return null;
  }
};

export default getConversationById;
