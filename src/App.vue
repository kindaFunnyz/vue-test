<script setup lang="ts">
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <el-container style="min-height: 100vh">
    <el-header class="bg-white shadow-sm px-4 flex items-center justify-between">
      <h1 class="text-xl font-bold">Панель управления</h1>
    </el-header>
    <el-main class="bg-gray-50 py-6 px-4">
      <div class="max-w-4xl mx-auto w-full"><home-view></home-view></div
    ></el-main>
  </el-container>
</template>

<style scoped>
.bg-white {
  background-color: #ffffff;
}
.bg-gray-50 {
  background-color: #f9fafb;
}
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.w-full {
  width: 100%;
}
.max-w-4xl {
  max-width: 64rem;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
</style>
