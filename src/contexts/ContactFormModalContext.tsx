import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type ContactFormModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ContactFormModalContext = createContext<ContactFormModalContextType | undefined>(undefined);

export const ContactFormModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ContactFormModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ContactFormModalContext.Provider>
  );
};

export const useContactFormModal = () => {
  const context = useContext(ContactFormModalContext);
  if (!context) {
    throw new Error('useContactFormModal must be used within ContactFormModalProvider');
  }
  return context;
};

