"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = ({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      className={clsx(
        "group flex gap-x-3 rounded-md p-4 w-full justify-center text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-200",
        active && "bg-gray-100 text-black"
      )}
      onClick={handleClick}
    >
      <Icon className='h-6 w-6 shrink-0' />
      <span className='sr-only'>{label}</span>
    </Link>
  );
};

export default MobileItem;
