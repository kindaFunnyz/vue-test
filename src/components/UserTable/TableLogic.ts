import { useAccountStore } from '@/stores/accountStore.ts';
import { onMounted, ref } from 'vue';
import { type RawAccount, RecordType } from '@/types/recordType.ts';

export function useAccountTableLogic() {
  const store = useAccountStore();
  const accounts = ref<RawAccount[]>([]);

  onMounted(() => {
    store.loadAccounts();
    accounts.value = store.accounts.map((acc) => ({
      id: acc.id,
      label: acc.label.map((l) => l.text).join('; '),
      type: acc.type,
      login: acc.login,
      password: acc.password ?? '',
      errors: {
        label: false,
        type: false,
        login: false,
        password: false,
      },
    }));
  });

  function addAccount() {
    accounts.value.push({
      id: '',
      label: '',
      type: RecordType.local,
      login: '',
      password: '',
      errors: {
        label: false,
        type: false,
        login: false,
        password: false,
      },
    });
  }

  function removeAccount(id: string) {
    const index = accounts.value.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      accounts.value.splice(index, 1);
      store.removeAccount(id);
    }
  }

  const validateAccount = (account: RawAccount): boolean => {
    account.errors.login =
      account.login.trim() === '' || account.login.length > 100;
    account.errors.password =
      account.type === RecordType.local &&
      (account.password.trim() === '' || account.password.length > 100);
    account.errors.label = account.label.length > 50;

    return !(
      account.errors.login ||
      account.errors.password ||
      account.errors.label
    );
  };

  const updateField = (
    account: RawAccount,
    field: keyof RawAccount,
    value: string | RecordType,
  ) => {
    (account[field] as any) = value;

    if (field === 'type' && value === RecordType.ldap) {
      account.password = '';
    }

    if (field !== 'password' || account.type === RecordType.local) {
      if (validateAccount(account)) {
        store.addAccount(account);
      }
    }
  };

  const hasErrors = (account: RawAccount) => {
    return Object.values(account.errors).some((val) => val);
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    updateField,
    hasErrors,
  };
}
