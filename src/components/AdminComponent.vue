<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { type AccountData, RecordType, useAccountStore } from '@/stores/accountStore'
import { Delete } from '@element-plus/icons-vue'

const store = useAccountStore()

const accounts = reactive<AccountData[]>([])

const isMobile = ref<boolean>(false)

function checkScreenWidth() {
  isMobile.value = window.innerWidth < 650
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenWidth)
})
onMounted(() => {
  checkScreenWidth()
  window.addEventListener('resize', checkScreenWidth)
  store.loadAccounts()
  accounts.push(
    ...store.accounts.map((acc) => ({
      id: acc.id,
      label: acc.label.map((l) => l.text).join('; '),
      type: acc.type,
      login: acc.login,
      password: acc.password ?? '',
      errors: {
        label: false,
        type: false,
        login: false,
        password: false,
      },
    })),
  )
})

const addAccount = () => {
  accounts.push({
    id: crypto.randomUUID(),
    label: '',
    type: RecordType.local,
    login: '',
    password: '',
    errors: {
      label: false,
      type: false,
      login: false,
      password: false,
    },
  })
}

const removeAccount = (id: string) => {
  const index = accounts.findIndex((acc) => acc.id === id)
  if (index !== -1) accounts.splice(index, 1)
  store.saveAccounts(accounts)
}

const validateAccount = (account: AccountData): boolean => {
  account.errors.login = account.login.trim() === '' || account.login.length > 100
  account.errors.password =
    account.type === RecordType.local &&
    (account.password.trim() === '' || account.password.length > 100)
  account.errors.label = account.label.length > 50

  return !(account.errors.login || account.errors.password || account.errors.label)
}

const updateField = (
  account: AccountData,
  field: keyof AccountData,
  value: string | RecordType,
) => {
  ;(account[field] as any) = value

  if (field === 'type' && value === RecordType.ldap) {
    account.password = ''
  }

  if (field !== 'password' || account.type === RecordType.local) {
    if (validateAccount(account)) {
      store.saveAccounts(accounts)
    }
  }
}
const hasErrors = (account: AccountData) => {
  return Object.values(account.errors).some(Boolean)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="addAccount" class="mb-4">Добавить учетную запись</el-button>
    <template v-if="isMobile">
      <el-form
        v-for="account in accounts"
        :key="account.id"
        :model="account"
        label-position="top"
        class="mb-6 p-4 border border-gray-300 rounded-bd bg-white"
      >
        <el-row :gutter="20" class="flex-wrap">
            <el-form-item label="Метка" :error="account.errors.label ? 'Максимум 50 символов' : ''">
              <el-input
                v-model="account.label"
                placeholder="Метки через ;"
                @blur="() => updateField(account, 'label', account.label)"
              />
              <div class="text-xs text-gray-500 mt-1">Метки разделяются через ;</div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Тип записи">
              <el-select
                v-model="account.type"
                @change="(val: RecordType) => updateField(account, 'type', val)"
                placeholder="Тип"
                class="w-full"
              >
                <el-option
                  v-for="(value, index) in RecordType"
                  :key="index"
                  :label="value"
                  :value="value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              label="Логин"
              :error="account.errors.login ? 'Обязательное поле, максимум 100 символов' : ''"
            >
              <el-input
                v-model="account.login"
                @blur="() => updateField(account, 'login', account.login)"
                placeholder="Логин"
              />
            </el-form-item>
          </el-col>

          <el-col v-if="account.type === RecordType.local" :span="24">
            <el-form-item
              label="Пароль"
              :error="account.errors.password ? 'Обязательное поле, максимум 100 символов' : ''"
            >
              <el-input
                v-model="account.password"
                type="password"
                show-password
                @blur="() => updateField(account, 'password', account.password)"
                placeholder="Пароль"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24" class="flex items-end">
            <el-button type="danger" @click="removeAccount(account.id)">Удалить</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-else>
      <div class="account-table">
        <div class="table-header">
          <div class="header-cell">Метка</div>
          <div class="header-cell">Тип записи</div>
          <div class="header-cell">Логин</div>
          <div class="header-cell">Пароль</div>
          <div class="header-cell"></div>
        </div>

        <div
          v-for="account in accounts"
          :key="account.id"
          class="table-row"
          :class="{ 'has-error': hasErrors(account) }"
        >
          <div class="table-cell">
            <el-form-item :error="account.errors.label ? 'Максимум 50 символов' : ''">
              <el-tooltip content="Метки разделяются через ;">
                <el-input
                  v-model="account.label"
                  placeholder="Метки через ;"
                  @blur="() => updateField(account, 'label', account.label)"
              /></el-tooltip>
            </el-form-item>
          </div>

          <div class="table-cell">
            <el-form-item>
              <el-select
                v-model="account.type"
                @change="(val: RecordType) => updateField(account, 'type', val)"
                placeholder="Тип"
                class="w-full"
              >
                <el-option
                  v-for="(value, index) in RecordType"
                  :key="index"
                  :label="value"
                  :value="value"
                />
              </el-select>
            </el-form-item>
          </div>

          <div class="table-cell">
            <el-form-item
              :error="account.errors.login ? 'Обязательное поле, максимум 100 символов' : ''"
            >
              <el-input
                v-model="account.login"
                @blur="() => updateField(account, 'login', account.login)"
                placeholder="Логин"
              />
            </el-form-item>
          </div>

          <div class="table-cell">
            <el-form-item
              v-if="account.type === RecordType.local"
              :error="account.errors.password ? 'Обязательное поле, максимум 100 символов' : ''"
            >
              <el-input
                v-model="account.password"
                type="password"
                show-password
                @blur="() => updateField(account, 'password', account.password)"
                placeholder="Пароль"
              />
            </el-form-item>
          </div>
          <div class="table-cell">
            <el-button type="danger" @click="removeAccount(account.id)"
              ><el-icon><Delete /></el-icon
            ></el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.p-4 {
  padding: 1rem;
}
.border {
  border: 1px solid #dcdfe6;
}
.rounded-bd {
  border-radius: 6px;
}
.bg-white {
  background-color: #ffffff;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-end {
  align-items: flex-end;
}

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

.header-cell,
.table-cell {
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

.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
</style>
