import { ref, watch } from 'vue';
import {
  type RawAccount,
  RecordType,
  SavedAccountModel,
} from '@/types/recordType.ts';
import type { FormInstance } from 'element-plus';
export type AccountFormEmit = {
  (e: 'saved', value: SavedAccountModel): void;
  (e: 'remove', id: string): void;
};
export function useAccountForm(
  props: { value?: SavedAccountModel },
  emit: AccountFormEmit,
) {
  const formRef = ref<FormInstance>();
  const data = ref<RawAccount>(createRawAccount(props?.value));

  watch(
    () => props.value,
    (newValue) => {
      data.value = createRawAccount(newValue);
    },
  );

  const rules = {
    label: [{ max: 50, message: 'Максимум 50 символов', trigger: 'blur' }],
    type: [
      { required: true, message: 'Выберите тип записи', trigger: 'change' },
    ],
    login: [
      { required: true, message: 'Введите логин', trigger: 'blur' },
      { max: 100, message: 'Максимум 100 символов', trigger: 'blur' },
    ],
    password: [
      {
        required: data.value.type === RecordType.local,
        message: 'Введите пароль',
        trigger: 'blur',
      },
      { max: 100, message: 'Максимум 100 символов', trigger: 'blur' },
    ],
  };

  const updateData = async () => {
    if (!formRef.value) return;
    try {
      const isValid = await formRef.value.validate();
      if (!isValid) return;
    } catch (e: unknown) {
      return;
    }
    if (data.value.type === RecordType.ldap) {
      data.value.password = '';
    }
    if (data.value.id === '') {
      data.value.id = crypto.randomUUID();
    }
    emit('saved', SavedAccountModel.fromRaw(data.value));
  };

  return {
    formRef,
    data,
    rules,
    updateData,
  };
}
function createRawAccount(model?: SavedAccountModel): RawAccount {
  return (
    model?.toRawAccount() ?? {
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
    }
  );
}
