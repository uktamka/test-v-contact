<template>
  <div>
    <q-table
      title="Contacts"
      :rows="rows"
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
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { User, ApiQuery } from 'src/types'
import { ref } from 'vue'
import { QTableProps } from 'quasar'
import { getUsers } from 'boot/axios'
import { useTagStore } from 'src/stores/UsersTags'

const tagsStore = useTagStore()

const loading = ref<boolean>(true)
const filter = ref<string>('')
const perPageOptions = ref<Array<number>>([10, 20, 40, 80, 100, 200])

const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 0,
})

const rows = ref<Array<User>>([])

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
  rows.value = data.items
  pagination.value.rowsNumber = data.total
  pagination.value.rowsPerPage = data.limit
  pagination.value.page = data.page
  pagination.value.descending = !!props?.pagination?.descending
  pagination.value.sortBy = query._sort as string // bug
  loading.value = false
}

await onRequest()
</script>
