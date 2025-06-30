<script setup lang="ts">
import { useIsMobile } from '@/utils/useScreenWidth.ts';
import DesktopUserTable from '@/components/UserTable/DesktopUserTable.vue';
import MobileUserTable from '@/components/UserTable/MobileUserTable.vue';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';

const { isMobile } = useIsMobile();
const needNew = ref<boolean>(false);
const isDebounced = ref<boolean>(false);

const showExpiringWarning = (text: string) => {
  ElNotification.warning({
    message: text,
    duration: 3000,
  });
};

const handleAddClick = () => {
  if (isDebounced.value) return;

  if (needNew.value) {
    showExpiringWarning('Сначала сохраните предыдущий аккаунт');
  }
  needNew.value = true;

  isDebounced.value = true;
  setTimeout(() => {
    isDebounced.value = false;
  }, 1500);
};
</script>

<template>
  <div>
    <el-button
      type="primary"
      @click="handleAddClick"
      class="mb-4"
      :class="{ 'full-width': isMobile }"
      >Добавить учетную запись</el-button
    >
    <mobile-user-table v-if="isMobile" v-model="needNew" />
    <desktop-user-table v-else v-model="needNew" />
  </div>
</template>

<style scoped>
.full-width {
  width: 100%;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
