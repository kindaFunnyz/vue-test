<script setup lang="ts">
import MobileAccountForm from '@/components/UserTable/UserForm/MobileAccountForm.vue';
import { useAccountStore } from '@/stores/accountStore.ts';
import { onMounted } from 'vue';
import type { SavedAccountModel } from '@/types/recordType.ts';
const needNew = defineModel<boolean>();
const store = useAccountStore();
onMounted(() => {
  store.loadAccounts();
});
function handleSaveNewAccount(account: SavedAccountModel) {
  store.addAccount(account);
  needNew.value = false;
}
function handleCancelNewAccount() {
  needNew.value = false;
}
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
      @saved="handleSaveNewAccount"
      @remove="handleCancelNewAccount"
  /></el-col>
</template>

<style scoped></style>
