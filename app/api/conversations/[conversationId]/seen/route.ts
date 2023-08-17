import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser || !currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //Find Existing Conversation
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    //Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    //update seen of lastMessage
    const updateMessage = await prismadb.message.update({
      where: {
        id: lastMessage?.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(updateMessage);
  } catch (error) {
    console.log("CONVERSATIONS[iD]_SEEN_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
