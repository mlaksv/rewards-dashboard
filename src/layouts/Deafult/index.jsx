import { Header} from 'common';
import styles from './index.module.scss';

export function DefaultLayout({ children }) {
	return (
		<div className={styles['default__wrapper']}>
			<Header title="Rewards Dashboard" />
			<main>{children}</main>					
		</div>
	);
}
