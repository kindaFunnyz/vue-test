import { defineStore } from 'pinia';
import { SavedAccountModel } from '@/types/recordType.ts';

interface AccountState {
  accounts: SavedAccountModel[];
}

export const useAccountStore = defineStore('accountStore', {
  state: (): AccountState => ({
    accounts: [],
  }),
  getters: {},
  actions: {
    addAccount(account: SavedAccountModel) {
      if (this.accounts.some((acc) => acc.id === account.id)) {
        throw new Error(`Аккаунт с id ${account.id} уже существует`);
      }
      this.accounts.push(account);

      const storageKey = `acc_${account.id}`;
      localStorage.setItem(storageKey, JSON.stringify(account));
    },
    editAccount(account: SavedAccountModel) {
      const forRemove = this.accounts.findIndex((val) => val.id === account.id);
      if (forRemove !== -1) {
        this.accounts[forRemove] = account;

        const storageKey = `acc_${account.id}`;
        localStorage.setItem(storageKey, JSON.stringify(account));
      } else throw new Error(`Аккаунт с id ${account.id} не найден`);
    },
    removeAccount(id: string) {
      const forRemove = this.accounts.findIndex((val) => val.id === id);
      if (forRemove !== -1) {
        this.accounts.splice(forRemove, 1);
        const storageKey = `acc_${id}`;
        localStorage.removeItem(storageKey);
      }
    },
    loadAccounts() {
      const accounts = [];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        console.log(key);
        if (key === null || !key?.startsWith('acc_')) continue;

        const raw = localStorage.getItem(key);
        if (!raw) {
          localStorage.removeItem(key);
          continue;
        }

        try {
          const parsed = JSON.parse(raw);
          const res = SavedAccountModel.fromJson(parsed);
          if (Array.isArray(res)) {
            localStorage.removeItem(key);
            console.warn(`Удалён невалидный аккаунт: ${parsed}`);
          } else {
            accounts.push(res);
          }
        } catch (e) {
          console.warn(`Ошибка при парсинге ключа "${key}":`, e);
        }
      }
      this.accounts = accounts;
    },
  },
});
