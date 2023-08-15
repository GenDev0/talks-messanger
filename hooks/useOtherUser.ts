import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { User } from "@prisma/client";

import { FullConversationType } from "@/types";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const { data: session } = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;
    const withoutCurrentUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return withoutCurrentUser;
  }, [session?.user?.email, conversation.users]);
  return otherUser[0];
};

export default useOtherUser;
