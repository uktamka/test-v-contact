<template>
  <q-page class="q-pa-xl">
    <main>
      <q-btn
        color="primary"
        icon="add"
        label="Create contact"
        @click="openForm"
      />

      <q-dialog v-model="dialogForm" persistent>
        <q-card>
          <q-toolbar>
            <q-toolbar-title> Create contact</q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <UserForm @submit="submitCreateForm" />
          </q-card-section>
        </q-card>
      </q-dialog>

      <UsersList
        :modal-value="users"
        @update:model-value="(e) => (users = e)"
      />
    </main>
  </q-page>
</template>
<script setup lang="ts">
import UsersList from 'src/components/UsersList.vue'
import UserForm from 'src/components/UserForm.vue'
import { createUser } from 'boot/UsersApi'
import { defineComponent, ref } from 'vue'
import { User } from 'src/types'

const dialogForm = ref<boolean>(false)
const users = ref<Array<User>>([])

const openForm = (): void => {
  dialogForm.value = true
}

const submitCreateForm = async (user: Partial<User>) => {
  dialogForm.value = false
  delete user.id
  const data = await createUser(user as Omit<User, 'id'>)
  if (typeof data === 'object') {
    users.value = [data, ...users.value]
  }
}

defineComponent({
  UsersList,
  UserForm,
})
</script>
