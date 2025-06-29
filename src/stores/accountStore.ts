import { defineStore } from 'pinia';
import { type RawAccount, SavedAccountModel } from '@/types/recordType.ts';

interface AccountState {
  accounts: SavedAccountModel[];
}

export const useAccountStore = defineStore('accountStore', {
  state: (): AccountState => ({
    accounts: [],
  }),
  getters: {},
  actions: {
    addAccount(rawAccount: RawAccount) {
      if (this.accounts.some((acc) => acc.id === rawAccount.id)) {
        throw new Error(`Аккаунт с id ${rawAccount.id} уже существует`);
      }
      const account = SavedAccountModel.fromRaw(rawAccount);
      this.accounts.push(account);

      const storageKey = `acc_${rawAccount.id}`;
      localStorage.setItem(storageKey, JSON.stringify(account));
    },
    editAccount(rawAccount: RawAccount) {
      const account = SavedAccountModel.fromRaw(rawAccount);
      const forRemove = this.accounts.findIndex(
        (val) => val.id === rawAccount.id,
      );
      if (forRemove !== -1) {
        this.accounts[forRemove] = account;

        const storageKey = `acc_${rawAccount.id}`;
        localStorage.setItem(storageKey, JSON.stringify(account));
      } else throw new Error(`Аккаунт с id ${rawAccount.id} не найден`);
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
