import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type ContactFormModalContextType = {
  isOpen: boolean;
  productName: string | null;
  openModal: (productName?: string) => void;
  closeModal: () => void;
};

const ContactFormModalContext = createContext<ContactFormModalContextType | undefined>(undefined);

export const ContactFormModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState<string | null>(null);

  const openModal = useCallback((productNameFromCard?: string) => {
    setProductName(productNameFromCard ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setProductName(null);
  }, []);

  return (
    <ContactFormModalContext.Provider value={{ isOpen, productName, openModal, closeModal }}>
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

