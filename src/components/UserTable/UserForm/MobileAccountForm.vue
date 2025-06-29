<script setup lang="ts">
import { type AccountFormEmit, useAccountForm } from './UserFormLogic.ts';
import { RecordType, type SavedAccountModel } from '@/types/recordType.ts';
const props = defineProps<{ value?: SavedAccountModel }>();
const emit = defineEmits<AccountFormEmit>();

const { formRef, data, rules, updateData } = useAccountForm(props, emit);
</script>

<template>
  <el-form
    :model="data"
    :rules="rules"
    ref="formRef"
    label-position="top"
    class="mb-6 p-4 border border-gray-300 rounded-bd bg-white"
  >
    <el-row :gutter="20" class="flex-wrap">
      <el-col :span="24">
        <el-form-item label="Метка" prop="label">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="updateData"
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
            @change="updateData"
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
            @blur="updateData"
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
            @blur="updateData"
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
<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.p-4 {
  padding: 1rem;
}
.border {
  border: 1px solid #dcdfe6;
}
.rounded-bd {
  border-radius: 6px;
}
.bg-white {
  background-color: #ffffff;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-end {
  align-items: flex-end;
}

.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
</style>
