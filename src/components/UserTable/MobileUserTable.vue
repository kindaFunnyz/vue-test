<script setup lang="ts">
import { RecordType } from '@/types/recordType.ts';
import { useAccountTableLogic } from './TableLogic.ts';
import MobileAccountForm from '@/components/MobileAccountForm.vue';
import { useAccountStore } from '@/stores/accountStore.ts';
const { accounts, addAccount, removeAccount, updateField, hasErrors } =
  useAccountTableLogic();
const store = useAccountStore();
</script>

<template>
  <mobile-account-form
    v-for="account in store.accounts"
    :key="account.id"
    :value="account"
    @remove="store.removeAccount"
    @saved="store."
  ></mobile-account-form>
</template>

<style scoped></style>
