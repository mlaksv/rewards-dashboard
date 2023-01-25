import { useCallback, useDeferredValue, useEffect, useId, useState } from 'react';

import { RewardsCenterContext } from 'context';
import { fetchPoints, fetchTransaction, fetchUsers } from 'mocks';
import { MonthStats, TransactionStats, UserList } from 'components';

import styles from './index.module.scss';

export function RewardsCenter() {
  
  // States
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [search, setSearch] = useState("");
  const [err, setError] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [displayText, setDisplayText] = useState("DisplayTransactions");
    
  // Constants
  const searchId = useId();
  const deferredSearch = useDeferredValue(search);
  
  useEffect(() => {
    Promise.all([fetchUsers(), fetchTransaction(), fetchPoints()])
      .then(([_users, _transactions, _userPoints]) => {
        // Considering them to be formatted
        setUsers(_users);
        setTransactions(_transactions);
        setPointTable(_userPoints);
      })
      .catch((userErr, transactionErr, pointErr) => {
        const err = userErr || transactionErr || pointErr;
        setError(typeof err === 'string' ? err :err?.message);
      })
  }, [])
  
  useEffect(() => {
    fetchPoints(deferredSearch)
      .then(_users => setUsers(_users))
      .catch(err => setError(typeof err === 'string' ? err :err?.message));
  }, [deferredSearch])
  
  const handleActiveUserClick = useCallback((user) => {
    setActiveUser(user);
  }, [setActiveUser])
  
  const handleUserSearch = (event) => {
    const { value } = event.target;
    
    setSearch(value);
  }
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
    if(isShown === true){
      setDisplayText("DisplayTransactions")
      
    }else{
      setDisplayText("HideTransactions")
    }
  };  
  
  return <RewardsCenterContext.Provider value={{ users, transactions, pointTable, activeUser, handleActiveUserClick }}>
    {err && <div className={styles["error_container"]}>
      <h1>Hold on we encountered an error! { err }</h1>
    </div>}
    <div className={styles["home__conatiner"]}>
      <div className={styles["search__container"]}>
        <label htmlFor={searchId}>Search User:</label>
        <input type="text" name="username" placeholder='User name' id={searchId} value={search} onChange={handleUserSearch} />
      </div>
      <div className={styles["users__container"]}>
        
        <UserList />                      
        <MonthStats />
      </div>
      <div className={styles["button_container"]}>
        <button onClick={handleClick}>{displayText}</button>
      </div>
      <div className={styles["transactions__container"]}>
        {/*show elements on click */}
        {isShown && (
        <div>
          <TransactionStats /> 
        </div>
        )}
    </div>
      <div className={styles["month__stats__container"]}>
      </div>
    </div>
  </RewardsCenterContext.Provider>
}