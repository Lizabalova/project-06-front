import { FaTimes } from 'react-icons/fa';
import css from './LogOut.module.css';

const Logout = ({ isOpen, closeModal, handleLogout }) => {

  return (
    <div>
      {isOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <div className={css.modalHeader}>
              <span className={css.modalTitle}>Log out</span>
              <span className={css.modalClose} onClick={closeModal}>
                <FaTimes />
              </span>
            </div>
            <h2>Do you really want to leave?</h2>
            <div className={css.modalButtons}>
              <button className={css.cancelButton} onClick={closeModal}>Cancel</button>
              <button className={css.logoutButton} onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;