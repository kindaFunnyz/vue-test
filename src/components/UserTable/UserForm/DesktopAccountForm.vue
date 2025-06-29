<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import { type AccountFormEmit, useAccountForm } from './UserFormLogic.ts';
import { RecordType, type SavedAccountModel } from '@/types/recordType.ts';
const props = defineProps<{ value?: SavedAccountModel }>();
const emit = defineEmits<AccountFormEmit>();

const { formRef, data, rules, updateData } = useAccountForm(props, emit);
</script>

<template>
  <el-form :model="data" :rules="rules" ref="formRef" label-position="top">
    <div class="table-cell">
      <el-form-item prop="label">
        <el-tooltip content="Метки разделяются через ;">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="() => updateData()"
        /></el-tooltip>
      </el-form-item>
    </div>

    <div class="table-cell">
      <el-form-item prop="type">
        <el-select
          v-model="data.type"
          @change="(val: RecordType) => updateData()"
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
    </div>

    <div
      class="table-cell"
      :class="{ 'merge-next': data.type == RecordType.ldap }"
    >
      <el-form-item prop="login">
        <el-input
          v-model="data.login"
          autocomplete="off"
          name="dummy-login"
          @blur="() => updateData()"
          placeholder="Логин"
        />
      </el-form-item>
    </div>

    <div v-if="data.type === RecordType.local" class="table-cell">
      <el-form-item prop="password">
        <el-input
          v-model="data.password"
          autocomplete="new-password"
          name="dummy-password"
          @blur="() => updateData()"
          type="password"
          show-password
          placeholder="Пароль"
        />
      </el-form-item>
    </div>
    <div class="table-cell">
      <el-button type="danger" @click="emit('remove', data.id)"
        ><el-icon><Delete /></el-icon
      ></el-button>
    </div>
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

.account-table {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr;
  gap: 1px;
  background-color: #ebeef5;
}

.header-cell,
.table-cell {
  padding: 12px 16px;
  background-color: white;
  overflow: hidden;
  min-width: 46px;
}

.header-cell {
  font-weight: bold;
  color: #333;
}

.table-row.has-error {
  background-color: #fff1f0;
}

.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
.merge-next {
  grid-column: span 2;
}
</style>
