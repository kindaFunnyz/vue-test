<script setup lang="ts">
import AdminComponent from '../components/AdminComponent.vue'
</script>

<template>
  <div>
    <div class="custom-page-header">
      <div class="header-title">
        <h2>Учетные записи</h2>
      </div>
    </div>
    <AdminComponent />
  </div>
</template>
<style scoped>
.custom-page-header {
  border-bottom: 1px solid var(--el-border-color-light);
  margin-bottom: 20px;
}
.header-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
</style>
