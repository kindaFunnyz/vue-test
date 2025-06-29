<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore.ts';
import { onMounted } from 'vue';
import DesktopAccountForm from '@/components/UserTable/UserForm/DesktopAccountForm.vue';
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

    <div v-for="account in store.accounts" :key="account.id">
      <desktop-account-form
        :value="account"
        class="table-row"
        @remove="store.removeAccount"
        @saved="store.editAccount"
      />
    </div>
    <desktop-account-form
      v-if="needNew"
      class="table-row"
      @saved="
        (account) => {
          store.addAccount(account);
          needNew = false;
        }
      "
      @remove="() => (needNew = false)"
    />
  </div>
</template>

<style scoped>
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

.header-cell {
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
</style>
