<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import { type AccountFormEmit, useAccountForm } from './UserFormLogic.ts';
import { RecordType, type SavedAccountModel } from '@/types/recordType.ts';
const props = defineProps<{ value?: SavedAccountModel }>();
const emit = defineEmits<AccountFormEmit>();

const { formRef, data, rules, updateData } = useAccountForm(props, emit);
</script>

<template>
  <el-form :model="data" :rules="rules" ref="formRef" :inline="true">
    <div class="table-cell">
      <el-form-item :error="data.errors.label ? 'Максимум 50 символов' : ''">
        <el-tooltip content="Метки разделяются через ;">
          <el-input
            v-model="data.label"
            placeholder="Метки через ;"
            @blur="() => updateData()"
        /></el-tooltip>
      </el-form-item>
    </div>

    <div class="table-cell">
      <el-form-item>
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

    <div class="table-cell">
      <el-form-item
        :error="
          data.errors.login ? 'Обязательное поле, максимум 100 символов' : ''
        "
      >
        <el-input
          v-model="data.login"
          @blur="() => updateData()"
          placeholder="Логин"
        />
      </el-form-item>
    </div>

    <div class="table-cell">
      <el-form-item
        v-if="data.type === RecordType.local"
        :error="
          data.errors.password ? 'Обязательное поле, максимум 100 символов' : ''
        "
      >
        <el-input
          v-model="data.password"
          type="password"
          show-password
          @blur="() => updateData()"
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

<style scoped></style>
