"use client";

import Modal from "@/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src: string | null;
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80'>
        <Image className='object-cover' src={src} alt={"Image sent"} fill />
      </div>
    </Modal>
  );
};
export default ImageModal;
