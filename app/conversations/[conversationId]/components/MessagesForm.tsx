"use client";

import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useConversation from "@/hooks/useConversation";
import MessageInput from "./MessageInput";

interface MessagesFormProps {}

const MessagesForm = (props: MessagesFormProps) => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center md:gap-4 w-full'>
      <CldUploadButton
        uploadPreset='bvmhql8u'
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
      >
        <HiPhoto size={30} className='text-sky-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 md:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='rounded-full p-2 cursor-pointer bg-sky-500 hover:bg-sky-600 transition'
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default MessagesForm;
