<script setup lang="ts">
import { useIsMobile } from '@/utils/useScreenWidth.ts';
import DesktopUserTable from '@/components/UserTable/DesktopUserTable.vue';
import MobileUserTable from '@/components/UserTable/MobileUserTable.vue';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';

const { isMobile } = useIsMobile();
const needNew = ref<boolean>(false);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const setAddNew = () => {
  if (debounceTimeout) return; // блокируем вызов, пока таймаут активен

  if (needNew.value) {
    ElNotification.warning({
      message: 'Сначала сохраните предыдущий аккаунт',
      duration: 3000,
    });
  }
  needNew.value = true;

  debounceTimeout = setTimeout(() => {
    debounceTimeout = null; // снимаем блокировку через 500ms
  }, 1500);
};
</script>

<template>
  <div>
    <el-button type="primary" @click="setAddNew" class="mb-4"
      >Добавить учетную запись</el-button
    >
    <mobile-user-table v-if="isMobile" v-model="needNew" />
    <desktop-user-table v-else v-model="needNew" />
  </div>
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
</style>
