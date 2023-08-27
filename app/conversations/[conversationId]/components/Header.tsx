"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";

import Avatar from "@/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    const connectedMembersCount = conversation.users.filter((user) =>
      members.includes(user.email!)
    ).length;
    console.log(connectedMembersCount);
    if (conversation.isGroup) {
      if (connectedMembersCount) {
        return `(${connectedMembersCount}/${conversation.users.length}) members online`;
      }
      return `All members(${conversation.users.length}) offline`;
    }
    return isActive ? `Active` : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 md:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link
            href={"/conversations"}
            className='md:hidden block text-sky-500 transition cursor-pointer'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div>{conversation.name || otherUser.name}</div>
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
          size={32}
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};

export default Header;
