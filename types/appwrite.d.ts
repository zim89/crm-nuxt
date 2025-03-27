import type { Account, Databases, Storage } from "appwrite";

export interface IAppwriteInstance {
  account: Account;
  storage: Storage;
  DB: Databases;
  DB_ID: string;
  DB_STORAGE: string;
}
