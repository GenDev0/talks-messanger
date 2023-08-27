import { useEffect, useState } from "react";
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";

const useActiveChannel = () => {
  const session = useSession();
  const { set, add, remove, members } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (session.data?.user) {
      let channel = activeChannel;

      if (!channel) {
        channel = pusherClient.subscribe("presence-messenger");
        setActiveChannel(channel);
      }

      channel.bind("pusher:subscription_succeeded", (members: Members) => {
        const initialMembers: string[] = [];

        members.each((member: Record<string, any>) =>
          initialMembers.push(member.id)
        );
        set(initialMembers);
      });

      channel.bind("pusher:member_added", (member: Record<string, any>) => {
        add(member.id);
      });

      channel.bind("pusher:member_removed", (member: Record<string, any>) => {
        remove(member.id);
      });
    }

    return () => {
      if (session?.data?.user) {
        if (activeChannel) {
          pusherClient.unsubscribe("presence-messenger");
          setActiveChannel(null);
        }
      }
    };
  }, [activeChannel, set, add, remove, session]);
};

export default useActiveChannel;
