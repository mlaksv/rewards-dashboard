import { useContext, useMemo } from 'react';
import { Table } from 'common';
import { RewardsCenterContext } from 'context';

import styles from './index.module.scss';

const config = {
	title: 'Click on below user record to see the monthly rewards',
};

export function UserList() {
	const { users, handleActiveUserClick } = useContext(RewardsCenterContext);

	const tableConfig = useMemo(() => {
		const headers = [
			{
				label: 'User Id',
				accessor: 'id',
			},
			{
				label: 'User Name',
				accessor: 'name',
      },
			{
				label: 'Points',
				accessor: 'points',
      },
		];

		const rows = users?.map((row) => ({
			props: {
				onClick: () => handleActiveUserClick(row.user),
				style: {
					cursor: 'pointer'
				}
			},
      data: {...row?.user, points: row.points},
		}));

		return Object.assign(config, { headers, rows });
	}, [users, handleActiveUserClick]);

	return (
		<div className={styles['user__list__wrapper']}>
			<Table config={tableConfig} />
		</div>
	);
}
