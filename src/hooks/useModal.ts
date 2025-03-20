import { useState } from 'react';

export const useModal = (initialValue: boolean = false) => {
  const [isOpen, setOpen] = useState(initialValue);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return { isOpen, handleOpen, handleClose, setOpen, toggleModal };
};
