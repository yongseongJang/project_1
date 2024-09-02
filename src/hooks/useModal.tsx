'use client';
import { useState } from 'react';

const useModal = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const changeModalStatus = (status: boolean) => {
    setIsVisibleModal(status);
  };

  return { isVisibleModal, changeModalStatus };
};

export default useModal;
