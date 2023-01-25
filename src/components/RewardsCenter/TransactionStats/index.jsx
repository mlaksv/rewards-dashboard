import { useContext, useMemo } from 'react';
import { RewardsCenterContext } from 'context';

import styles from './index.module.scss';
import { Table } from 'common';

const config = {};

export function TransactionStats() {
  const { transactions } = useContext(RewardsCenterContext);
  
  const tableConfig = useMemo(() => {
    if (!transactions[0]) return config;
    
    const headers = Object.keys(transactions[0]).map((key) => ({
      label: key?.toUpperCase(),
      accessor: key,
    }));
    const rows = transactions.map(transaction => ({ data: {...transaction, createdAt: transaction?.createdAt?.toLocaleDateString()} }));
    const title = `Rewards User Transactions`;
    
    return Object.assign(config, { headers, rows, title });
  }, [transactions])
  
  return <div className={styles["transactions__list__wrapper"]}>
    <Table config={tableConfig} />
  </div>
}