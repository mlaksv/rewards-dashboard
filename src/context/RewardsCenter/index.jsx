import { createContext } from "react";

export const RewardsCenterContext = createContext({
  users: [],
  transactions: [],
  pointTable: [],
  activeUser: null
})