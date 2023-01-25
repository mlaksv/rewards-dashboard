import styles from './index.module.scss';

export function Table({ config = {} }) {
	const {
		headers = [],
		rows = [],
		headerProps = {},
		bodyProps = {},
		title,
		...props
	} = config;

	const renderHeaders = () => {
		if (!Array.isArray(headers)) return null;

		return (
			<thead {...headerProps} className={styles["headers__wrapper"]}>
				{title && (
					<tr className={styles['table__title']}>
						<th colSpan={headers.length}>{title}</th>
					</tr>
				)}
				<tr>
					{headers.map((header) => {
						return <th key={header?.label}>{header?.label}</th>;
					})}
				</tr>
			</thead>
		);
	};

	const renderRows = () => {
		if (!Array.isArray(rows)) return null;

		const renderColumns = (data) => {
			if (!data) return null;

			return headers.map(({ accessor }) => {
				const key = data[accessor]?.toString();

				return <td key={key}>{key}</td>;
			});
		};

		return (
			<tbody {...bodyProps} className={styles["rows__wrapper"]}>
				{rows.map((row, rowNum) => {
					return (
						<tr {...row?.props} key={rowNum}>
							{renderColumns(row.data)}
						</tr>
					);
				})}
			</tbody>
		);
	};

	return (
		<table {...props} className={styles['table__wrapper']}>
			{renderHeaders()}
			{renderRows()}
		</table>
	);
}
