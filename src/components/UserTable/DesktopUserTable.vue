<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore.ts';
import { onMounted } from 'vue';
import DesktopAccountForm from '@/components/UserTable/UserForm/DesktopAccountForm.vue';
import MobileAccountForm from '@/components/UserTable/UserForm/MobileAccountForm.vue';
const needNew = defineModel<boolean>();
const store = useAccountStore();
onMounted(() => {
  store.loadAccounts();
});
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

    <div v-for="account in store.accounts" :key="account.id" class="table-row">
      <desktop-account-form
        :value="account"
        @remove="store.removeAccount"
        @saved="store.editAccount"
      />
      <desktop-account-form
        v-if="needNew"
        @saved="
          (account) => {
            store.addAccount(account);
            needNew = false;
          }
        "
        @remove="() => (needNew = false)"
      />
    </div>
  </div>
</template>

<style scoped></style>
