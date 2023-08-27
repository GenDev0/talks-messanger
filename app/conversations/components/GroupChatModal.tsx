import Modal from "@/components/Modal";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a group Chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a Chat with more than 2 people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                label={"Name"}
                id={"name"}
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />
              <Select
                label={"members"}
                disabled={isLoading}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            disabled={isLoading}
            type='button'
            variant={"outline"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default GroupChatModal;
