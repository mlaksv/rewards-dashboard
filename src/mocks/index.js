import { calculateRewards, setupMockTransaction, setupMockUser, getMonth } from "utils";

const users = setupMockUser(10);
const transactions = setupMockTransaction(users, 12);
const pointsCache = {};

export function fetchUsers(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== 'number') reject(new Error("Invalid delay provided"));
    setTimeout(() => {
      resolve(users);
    }, delay)
  })
}


export function fetchTransaction(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== 'number') reject(new Error("Invalid delay provided"));
    setTimeout(() => {
      resolve(transactions);
    }, delay)
  })
}

export function fetchUserMonthlyPoints(userId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== 'number') reject(new Error("Invalid delay provided"));
    
    if (!pointsCache[userId]) pointsCache[userId] = {};
  
    let result = pointsCache[userId].monthly;
    
    if (!result) {
      const user = users.find(user => user?.id === userId);
      result = pointsCache[user.id].monthly ?? transactions.filter(transaction => transaction?.initiatedBy === user?.name).reduce((prev, curr) => {
        const month = getMonth(new Date(curr.createdAt).getMonth()), points = calculateRewards(curr.amount);
        
        prev[month] = prev[month] + points || points;
        return prev;
      }, {});
    }
    
    pointsCache[userId].monthly = result;
  
    
    setTimeout(() => {
      resolve(result);
    }, delay)
  })
}

export function fetchPoints(search = '') {
  const filteredUsers = users.filter(user => user?.name?.toLowerCase().includes(search?.toLowerCase()));
  
  return Promise.all(filteredUsers.map(user => fetchUserPoints(user?.id)))
}


export function fetchUserPoints(userId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== 'number') reject(new Error("Invalid delay provided"));
    
    if (!pointsCache[userId]) pointsCache[userId] = {};
    
    let result = pointsCache[userId].stats;
  
    if (!result) {
      const user = users.find(user => user?.id === userId);
      const userTransactions = transactions.filter(transaction => transaction?.initiatedBy === user?.name);
      const points = userTransactions.reduce((prev, curr) => prev + calculateRewards(curr?.amount), 0);
      
      result = {
        user,
        points
      }
    }
    
    pointsCache[userId] = result;
    
    setTimeout(() => {
      resolve(result);
    }, delay)
  })
}