export enum RecordType {
  ldap = 'LDAP',
  local = 'Локальная',
}

export interface SavedAccount {
  id: string;
  label: { text: string }[];
  type: RecordType;
  login: string;
  password: string | null;
}

export class SavedAccountModel implements SavedAccount {
  id: string;
  label: { text: string }[];
  type: RecordType;
  login: string;
  password: string | null;

  private constructor(
    id: string,
    label: { text: string }[],
    type: RecordType,
    login: string,
    password: string | null,
  ) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.login = login;
    this.password = password;
  }

  static fromJson(json: unknown): SavedAccountModel | string[] {
    const errors = [];
    if (typeof json !== 'object' || json === null) {
      errors.push('JSON должен быть объектом');
    }
    const obj = json as Record<string, unknown>;

    if (obj?.id == undefined || typeof obj.id !== 'string') {
      errors.push('Отсутствует или неверный id');
    }
    const id = obj.id as string;
    if (obj?.label == undefined || !Array.isArray(obj.label)) {
      errors.push('Поле label должно быть массивом');
    }
    const label: { text: string }[] = [];

    const rawLabel = obj.label as unknown[];
    for (let i = 0; i < rawLabel.length; i++) {
      const item = rawLabel[i];
      const tmpItem = item as Record<string, unknown>;

      if (typeof tmpItem?.text !== 'string') {
        errors.push(`label[${i}]: text должен быть строкой`);
        continue;
      }

      label.push({ text: tmpItem.text });
    }

    if (
      obj?.type == undefined ||
      !Object.values(RecordType).includes(obj.type as RecordType)
    ) {
      errors.push(`Неверный тип: ${obj.type}`);
    }
    const type = obj.type as RecordType;

    if (obj?.login == undefined || typeof obj.login !== 'string') {
      errors.push('login должен быть строкой');
    }
    const login = obj.login as string;

    if (
      type == RecordType.local &&
      (obj?.password == null || typeof obj?.password !== 'string')
    ) {
      errors.push('Для локальных записей должен быть указан валидный пароль');
    }
    const password = typeof obj?.password == 'string' ? obj.password : null;

    return errors.length > 0
      ? errors
      : new SavedAccountModel(id, label, type as RecordType, login, password);
  }

  static fromRaw(account: RawAccount): SavedAccountModel {
    return new SavedAccountModel(
      account.id,
      account.label
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((text) => ({ text })),
      account.type,
      account.login,
      account.password === '' ? null : account.password,
    );
  }

  static fromFields(options: {
    label?: string;
    type?: RecordType;
    login?: string;
    password?: string | null;
  }): SavedAccountModel {
    return new SavedAccountModel(
      crypto.randomUUID(),
      options.label ? [{ text: options.label }] : [],
      options.type ?? RecordType.local,
      options.login ?? '',
      options.password ?? '',
    );
  }

  toRawAccount(): RawAccount {
    return {
      id: this.id,
      label: this.label.reduce((acc, cur) => acc + cur.text + '; ', ''),
      type: this.type,
      login: this.login,
      password: this.password ?? '',
      errors: {
        label: false,
        type: false,
        login: false,
        password: false,
      },
    };
  }
}

export interface RawAccount {
  id: string;
  label: string;
  type: RecordType;
  login: string;
  password: string;
  errors: {
    label: boolean;
    type: boolean;
    login: boolean;
    password: boolean;
  };
}
