import css from "./ConfirmModal.module.css";

export default function ConfirmModal() {
  return (
    <div>
      <h3 className={css.title}>Delete entry</h3>
      <p className={css.question}>Are you sure you want to delete the entry?</p>
      <button className={css.btnCancel}>Cancel</button>
      <button className={css.btnRed}>Delete</button>
    </div>
  );
}
