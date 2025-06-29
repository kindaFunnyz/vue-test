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
  if (debounceTimeout) return;

  if (needNew.value) {
    ElNotification.warning({
      message: 'Сначала сохраните предыдущий аккаунт',
      duration: 3000,
    });
  }
  needNew.value = true;

  debounceTimeout = setTimeout(() => {
    debounceTimeout = null;
  }, 1500);
};
</script>

<template>
  <div>
    <el-button
      type="primary"
      @click="setAddNew"
      class="mb-4"
      :class="isMobile ? 'full-width' : ''"
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
