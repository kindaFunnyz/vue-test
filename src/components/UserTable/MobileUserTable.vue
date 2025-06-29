<script setup lang="ts">
import MobileAccountForm from '@/components/UserTable/UserForm/MobileAccountForm.vue';
import { useAccountStore } from '@/stores/accountStore.ts';
import { onMounted } from 'vue';
const needNew = defineModel<boolean>();
const store = useAccountStore();
onMounted(() => {
  store.loadAccounts();
});
</script>

<template>
  <el-col>
    <mobile-account-form
      v-for="account in store.accounts"
      :key="account.id"
      :value="account"
      @remove="store.removeAccount"
      @saved="store.editAccount" />
    <mobile-account-form
      v-if="needNew"
      @saved="
        (account) => {
          store.addAccount(account);
          needNew = false;
        }
      "
      @remove="() => (needNew = false)"
  /></el-col>
</template>

<style scoped></style>
