import type { Account, Databases, Storage } from "appwrite";

export interface AppwriteInstance {
  account: Account;
  storage: Storage;
  DB: Databases;
}
