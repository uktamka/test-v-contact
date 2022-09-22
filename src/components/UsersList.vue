<template>
  <div>
    <q-table
      title="Contacts"
      :rows="modalValue"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="perPageOptions"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template #top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body-cell-actions="prop">
        <q-td :props="prop">
          <q-btn
            color="primary"
            @click="editUserItem = prop.row"
            icon="edit"
            label="edit"
          />
          <q-btn
            color="negative"
            icon="close"
            @click="delUser(prop.row.id)"
            label="delete"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog
      :model-value="editUserItem !== undefined"
      persistent
      @hide="editUserItem = undefined"
    >
      <q-card>
        <q-toolbar>
          <q-toolbar-title> Create contact</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <UserForm :user="editUserItem" @submit="submitEditForm" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
import { User, ApiQuery } from 'src/types'
import UserForm from './UserForm.vue'
import { ref, defineComponent } from 'vue'
import { QTableProps } from 'quasar'
import { getUsers, deleteUser, editUser } from 'boot/axios'
import { useTagStore } from 'src/stores/UsersTags'

const props = defineProps<{ modalValue: Array<User> }>()
const emits = defineEmits<{
  (e: 'update:modelValue', users: Array<User>): void
}>()
const tagsStore = useTagStore()

const loading = ref<boolean>(true)
const filter = ref<string>('')
const perPageOptions = ref<Array<number>>([10, 20, 40, 80, 100, 200])
const editUserItem = ref<User | undefined>(undefined)

const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

const columns = ref([
  {
    name: 'id',
    required: true,
    label: 'id',
    field: 'id',
  },
  {
    name: 'name',
    required: true,
    label: 'name',
    field: 'name',
  },
  {
    name: 'username',
    required: true,
    label: 'username',
    field: 'username',
  },
  {
    name: 'phone',
    required: true,
    label: 'phone',
    field: 'phone',
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    field: 'email',
  },
  {
    name: 'tag',
    required: true,
    sortable: true,
    label: 'tag',
    field: (row: User) => tagsStore.tags.find((t) => t.id === row.tag)?.name,
  },
  {
    name: 'actions',
    label: 'actions',
    field: 'actions',
  },
])

const onRequest = async (props?: {
  pagination: QTableProps['pagination']
  filter?: 'string'
}): Promise<void> => {
  loading.value = true
  const query: ApiQuery = {}
  query._limit = pagination.value?.rowsPerPage
  query._page = pagination.value?.page
  if (props?.filter) query.q = props.filter
  if (props?.pagination?.rowsPerPage)
    query._limit = props.pagination?.rowsPerPage
  if (props?.pagination?.page) query._page = props.pagination?.page
  if (props?.pagination?.sortBy) query._sort = props.pagination?.sortBy
  if (props?.pagination?.descending) query._order = props.pagination?.sortBy

  const data = await getUsers(query)
  emits('update:modelValue', data.items)
  pagination.value.rowsNumber = data.total
  pagination.value.rowsPerPage = data.limit
  pagination.value.page = data.page
  pagination.value.descending = !!props?.pagination?.descending
  pagination.value.sortBy = query._sort as string // bug
  loading.value = false
}

const delUser = async (id: number) => {
  const result = await deleteUser(id)
  if (result) {
    emits(
      'update:modelValue',
      props.modalValue.filter((e) => e.id !== id)
    )
  }
}

const submitEditForm = async (user: Partial<User>) => {
  editUserItem.value = undefined
  const data = await editUser(user as Omit<User, 'id'>)
  if (typeof data === 'object') {
    const arrUsers = [...props.modalValue]
    const indexUser = arrUsers.findIndex((u) => u.id === data.id)
    arrUsers[indexUser] = data
    emits('update:modelValue', arrUsers)
  }
}

defineComponent({
  UserForm,
})

await onRequest()
</script>
