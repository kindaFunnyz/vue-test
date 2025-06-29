<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  type RawAccount,
  RecordType,
  SavedAccountModel,
} from '@/types/recordType.ts';
import type { FormInstance } from 'element-plus';
const formRef = ref<FormInstance>();
const props = defineProps<{
  value?: SavedAccountModel;
}>();
const parseOrNew = (newValue?: SavedAccountModel) => {
  return (
    newValue?.toRawAccount() ?? {
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
};
const data = ref<RawAccount>(parseOrNew(props?.value));
watch(
  () => props.value,
  (newValue?: SavedAccountModel) => (data.value = parseOrNew(newValue)),
);
const emit = defineEmits<{
  (e: 'saved', value: SavedAccountModel): void;
  (e: 'remove', id: string): void;
}>();

const rules = {
  label: [
    // Заглушка
    { required: true, message: 'Введите метку', trigger: 'blur' },
    { max: 50, message: 'Максимум 50 символов', trigger: 'blur' },
  ],
  type: [{ required: true, message: 'Выберите тип записи', trigger: 'change' }],
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

const updateField = async (
  field: keyof RawAccount,
  value: string | RecordType,
) => {
  if (!formRef.value) return;
  const res = await formRef.value.validate();
  if (!res) return;

  const updated = { ...data.value, [field]: value };

  if (field === 'type' && value === RecordType.ldap) {
    updated.password = '';
  }
  emit('saved', SavedAccountModel.fromRaw(updated));
};
</script>

<template>
  <el-form
    :model="data"
    :rules="rules"
    :ref="formRef"
    label-position="top"
    class="mb-6 p-4 border border-gray-300 rounded-bd bg-white"
  >
    <el-row :gutter="20" class="flex-wrap">
      <el-col :span="24">
        <el-form-item label="Метка" prop="label">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="() => updateField('label', data.label)"
          />
          <div class="text-xs text-gray-500 mt-1">
            Метки разделяются через ;
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="Тип записи" prop="type">
          <el-select
            v-model="data.type"
            @change="(val: RecordType) => updateField('type', val)"
            placeholder="Тип"
            class="w-full"
          >
            <el-option
              v-for="(value, index) in RecordType"
              :key="index"
              :label="value"
              :value="value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="Логин" prop="login">
          <el-input
            v-model="data.login"
            @blur="() => updateField('login', data.login)"
            placeholder="Логин"
          />
        </el-form-item>
      </el-col>

      <el-col v-if="data.type === RecordType.local" :span="24">
        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model="data.password"
            type="password"
            show-password
            @blur="() => updateField('password', data.password)"
            placeholder="Пароль"
          />
        </el-form-item>
      </el-col>

      <el-col :span="24" class="flex items-end">
        <el-button type="danger" @click="emit('remove', data.id)">
          Удалить
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
