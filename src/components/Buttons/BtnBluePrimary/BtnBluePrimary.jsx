import css from "./BtnBluePrimary.module.css";

export default function BtnBluePrimary({ children }) {
  return <button className={css.btn}>{children}</button>;
}
