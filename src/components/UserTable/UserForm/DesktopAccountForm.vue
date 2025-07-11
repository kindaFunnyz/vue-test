<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
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
  <el-form :model="data" :rules="rules" ref="formRef" label-position="top">
    <div class="table-cell">
      <el-form-item prop="label">
        <el-tooltip content="Метки разделяются через ;">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="updateData"
        /></el-tooltip>
      </el-form-item>
    </div>

    <div class="table-cell">
      <el-form-item prop="type">
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
    </div>

    <div class="table-cell" :class="{ 'merge-next': !showPasswordField }">
      <el-form-item prop="login">
        <el-input
          v-model="data.login"
          autocomplete="off"
          name="dummy-login"
          @blur="updateData"
          placeholder="Логин"
        />
      </el-form-item>
    </div>

    <div v-if="showPasswordField" class="table-cell">
      <el-form-item prop="password">
        <el-input
          v-model="data.password"
          autocomplete="new-password"
          name="dummy-password"
          @blur="updateData"
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
.table-cell {
  padding: 12px 16px;
  background-color: white;
  overflow: hidden;
  min-width: 46px;
}

.merge-next {
  grid-column: span 2;
}
</style>
