"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import UploadModal from "@/components/modals/upload-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ConfirmModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
