<script setup lang="ts">
import { type AccountFormEmit, useAccountForm } from './UserFormLogic.ts';
import { RecordType, type SavedAccountModel } from '@/types/recordType.ts';
import { computed } from 'vue';
const props = defineProps<{ value?: SavedAccountModel }>();
const emit = defineEmits<AccountFormEmit>();

const { formRef, data, rules, updateData } = useAccountForm(props, emit);
const showPasswordField = computed(() => data.value.type === RecordType.local);
const recordTypeOptions = Object.values(RecordType);
</script>

<template>
  <el-form
    :model="data"
    :rules="rules"
    ref="formRef"
    label-position="left"
    class="account-form"
  >
    <el-row :gutter="20" class="flex-wrap">
      <el-col :span="24">
        <el-form-item label="Метка" prop="label">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="updateData"
          />
          <div class="form-help">Метки разделяются через ;</div>
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
              v-for="value in recordTypeOptions"
              :key="value"
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

      <el-col v-if="showPasswordField" :span="24">
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

      <el-col :span="24" class="actions">
        <el-button type="danger" @click="emit('remove', data.id)">
          Удалить
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped>
.account-form {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background-color: #ffffff;
}
.flex-wrap {
  flex-wrap: wrap;
}
.form-help {
  font-size: 0.75rem;
  color: #909399;
  margin-top: 0.25rem;
}
.actions {
  display: flex;
  align-items: flex-end;
}
</style>
