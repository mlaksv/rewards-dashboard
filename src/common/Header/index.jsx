import styles from './index.module.scss';

export function Header({
  children,
  title,
  headerProps = {},
}) {
  return (
    <header className={styles['header_wrapper']}>
      <h1 {...headerProps} className={styles["header"]}>{title}</h1>
      { children }
    </header>
  )
}
