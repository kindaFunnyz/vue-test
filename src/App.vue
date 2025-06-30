<script setup lang="ts">
import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <el-container style="min-height: 100vh">
    <el-header class="header px-4">
      <h1>Панель управления</h1>
    </el-header>
    <el-main class="main px-4">
      <HomeView class="centralize" />
    </el-main>
  </el-container>
</template>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main {
  background-color: #f9fafb;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.centralize {
  margin-left: auto;
  margin-right: auto;
  max-width: 64rem;
  width: 100%;
}
</style>
