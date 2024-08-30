"use client";

import { useConfirmModal } from "@/hooks/use-confirm-modal";
import Modal from "@/components/modal";

const ConfirmModal = () => {
  const { isOpen, onClose, onConfirm } = useConfirmModal();
  return (
    <Modal
      title="Confirm Delete"
      description="You cannot undo or recover the file once deleted. Are you really sure you want to delete this file?"
      isOpen={isOpen}
      onClose={onClose}
      action={onConfirm}
    />
  );
};

export default ConfirmModal;
