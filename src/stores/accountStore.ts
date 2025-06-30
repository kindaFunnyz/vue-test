import { defineStore } from 'pinia';
import { SavedAccountModel } from '@/types/recordType.ts';
import {
  loadAccountsFromStorage,
  removeAccount,
  saveAccount,
} from '@/stores/accountStorage.ts';

interface AccountState {
  accounts: SavedAccountModel[];
}
export const useAccountStore = defineStore('accountStore', {
  state: (): AccountState => ({
    accounts: [],
  }),
  actions: {
    addAccount(account: SavedAccountModel) {
      if (this.accounts.some((acc) => acc.id === account.id)) {
        throw new Error(`Аккаунт с id ${account.id} уже существует`);
      }
      this.accounts.push(account);
      saveAccount(account);
    },
    editAccount(account: SavedAccountModel) {
      const index = this.accounts.findIndex((val) => val.id === account.id);
      if (index === -1) throw new Error(`Аккаунт с id ${account.id} не найден`);

      this.accounts[index] = account;
      saveAccount(account);
    },
    removeAccount(id: string) {
      const index = this.accounts.findIndex((val) => val.id === id);
      if (index !== -1) {
        this.accounts.splice(index, 1);
        removeAccount(id);
      }
    },
    loadAccounts() {
      this.accounts = loadAccountsFromStorage();
    },
  },
});
