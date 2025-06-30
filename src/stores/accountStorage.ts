import { SavedAccountModel } from '@/types/recordType.ts';

export const STORAGE_PREFIX = 'acc_';

export function saveAccount(account: SavedAccountModel) {
  localStorage.setItem(
    `${STORAGE_PREFIX}${account.id}`,
    JSON.stringify(account),
  );
}

export function removeAccount(id: string) {
  localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
}

export function loadAccountsFromStorage(): SavedAccountModel[] {
  const result: SavedAccountModel[] = [];

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (!key?.startsWith(STORAGE_PREFIX)) continue;

    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.removeItem(key);
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      const model = SavedAccountModel.fromJson(parsed);
      if (!Array.isArray(model)) {
        result.push(model);
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      localStorage.removeItem(key);
    }
  }

  return result;
}
