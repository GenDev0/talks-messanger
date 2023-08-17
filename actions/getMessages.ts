import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMessages = async (conversationId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const messages = prismadb.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: true,
        seen: true,
      },
    });
    if (!messages) {
      return [];
    }
    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
