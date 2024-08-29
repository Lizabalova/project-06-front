import css from "./BtnBlue.module.css";

export default function BtnBlue({ children }) {
  return <button className={css.btn}>{children}</button>;
}
