import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import css from "./DeleteEntry.module.css";
import { toggleDeleteEntryModal } from "../../redux/mainWater/slice";
import {
  deleteWaterEntry,
  fetchTodayWater,
} from "../../redux/mainWater/operations";
import { selectIsDeleteEntryOpen } from "../../redux/mainWater/selectors";

const DeleteEntry = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const isDeleteEntryOpen = useSelector(selectIsDeleteEntryOpen);

  const closeModal = () => {
    dispatch(toggleDeleteEntryModal());
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(id)).unwrap();
      dispatch(fetchTodayWater());
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
    closeModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  return (
    <>
      {isDeleteEntryOpen && (
        <div className={css.modalOverlay} onClick={handleBackdropClick}>
          <div className={css.modalContent}>
            <div className={css.modalHeader}>
              <span className={css.modalTitle}>Delete entry</span>
              <span className={css.modalClose} onClick={closeModal}>
                <FaTimes />
              </span>
            </div>
            <h2>Are you sure you want to delete the entry?</h2>
            <div className={css.modalButtons}>
              <button className={css.cancelButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={css.deleteButton} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEntry;
