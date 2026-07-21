import Modal from '../Modal/Modal';
import CooperationForm from '../CooperationForm/CooperationForm';
import styles from './ContactFormModal.module.css';

type ContactFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Название продукта, с карточки которого открыта форма */
  productName?: string | null;
  productId?: string | null;
};

const ContactFormModal = ({ isOpen, onClose, productName = null, productId = null }: ContactFormModalProps) => {
  const handleSuccess = () => {
    // Автоматически закрываем modal через 2 секунды после успешной отправки
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Оставить заявку"
      showCloseButton={true}
      closeOnBackdrop={true}
    >
      <div className={styles.modalFormContainer}>
        <CooperationForm onSuccess={handleSuccess} showHeader={false} initialProductName={productName} initialProductId={productId} />
      </div>
    </Modal>
  );
};

export default ContactFormModal;
