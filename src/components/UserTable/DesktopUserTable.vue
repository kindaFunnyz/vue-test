<script setup lang="ts">
import { type RawAccount, RecordType } from '@/types/recordType.ts';
import { Delete } from '@element-plus/icons-vue';
const props = defineProps<{
  accounts: RawAccount[];
}>();
</script>

<template>
  <div class="account-table">
    <div class="table-header">
      <div class="header-cell">Метка</div>
      <div class="header-cell">Тип записи</div>
      <div class="header-cell">Логин</div>
      <div class="header-cell">Пароль</div>
      <div class="header-cell"></div>
    </div>

    <div
      v-for="account in accounts"
      :key="account.id"
      class="table-row"
      :class="{ 'has-error': hasErrors(account) }"
    >
      <div class="table-cell">
        <el-form-item
          :error="account.errors.label ? 'Максимум 50 символов' : ''"
        >
          <el-tooltip content="Метки разделяются через ;">
            <el-input
              v-model="account.label"
              placeholder="Метки через ;"
              @blur="() => updateField(account, 'label', account.label)"
          /></el-tooltip>
        </el-form-item>
      </div>

      <div class="table-cell">
        <el-form-item>
          <el-select
            v-model="account.type"
            @change="(val: RecordType) => updateField(account, 'type', val)"
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
            account.errors.login
              ? 'Обязательное поле, максимум 100 символов'
              : ''
          "
        >
          <el-input
            v-model="account.login"
            @blur="() => updateField(account, 'login', account.login)"
            placeholder="Логин"
          />
        </el-form-item>
      </div>

      <div class="table-cell">
        <el-form-item
          v-if="account.type === RecordType.local"
          :error="
            account.errors.password
              ? 'Обязательное поле, максимум 100 символов'
              : ''
          "
        >
          <el-input
            v-model="account.password"
            type="password"
            show-password
            @blur="() => updateField(account, 'password', account.password)"
            placeholder="Пароль"
          />
        </el-form-item>
      </div>
      <div class="table-cell">
        <el-button type="danger" @click="removeAccount(account.id)"
          ><el-icon><Delete /></el-icon
        ></el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
