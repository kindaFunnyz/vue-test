import { defineStore } from 'pinia'

export enum RecordType {
  ldap = 'LDAP',
  local = 'Локальная',
}
export interface SavedAccount {
  id: string
  label: { text: string }[]
  type: RecordType
  login: string
  password: string | null
}
export interface AccountData {
  id: string
  label: string
  type: RecordType
  login: string
  password: string
  errors: {
    label: boolean
    type: boolean
    login: boolean
    password: boolean
  }
}
export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: [] as SavedAccount[],
  }),
  getters: {},
  actions: {
    saveAccounts(accounts: AccountData[]) {
      this.accounts = accounts.map((acc) => ({
        id: acc.id,
        label: acc.label
          .split(';')
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) => ({ text: v })),
        type: acc.type,
        login: acc.login,
        password: acc.type === 'LDAP' ? null : acc.password,
      }))
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    loadAccounts() {
      const saved = localStorage.getItem('accounts')
      if (saved) {
        this.accounts = JSON.parse(saved)
      }
    },
  },
})
