"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput = ({
  id,
  type,
  placeholder,
  required,
  register,
  errors,
}: MessageInputProps) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='text-black font-light py-2 px-4 bg-neutral-200 w-full rounded-full focus:outline-none'
      />
    </div>
  );
};

export default MessageInput;