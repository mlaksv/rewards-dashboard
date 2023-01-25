import { useContext, useEffect, useState } from 'react';
import { RewardsCenterContext } from 'context';

import styles from './index.module.scss';
import { fetchUserMonthlyPoints } from 'mocks';
import { Table } from 'common';

export function MonthStats() {
	const { activeUser } = useContext(RewardsCenterContext);
	const [tableConfig, setTableConfig] = useState({});

	useEffect(() => {
		if (activeUser?.id)
			fetchUserMonthlyPoints(activeUser?.id).then((data) => {
				const headers = [
					{
						label: 'Month',
						accessor: 'month',
					},
					{
						label: 'Points',
						accessor: 'points',
					},
				];
				const rows = Object.entries(data).map(([month, points]) => ({
					data: { month, points },
				}));
				const title = `${activeUser?.name} Monthly Points`;

				console.log('rows', rows);

				setTableConfig({
					headers,
					rows,
					title,
				});
			});
	}, [activeUser]);

	return (
		activeUser && (
			<div className={styles['month__stats__wrapper']}>
				<Table config={tableConfig} />
			</div>
		)
	);
}
