<template>
  <q-page class="q-pa-xl">
    <main>
      <UsersList />
    </main>
  </q-page>
</template>
<script setup lang="ts">
import UsersList from 'src/components/UsersList.vue'
import { defineComponent } from 'vue'

defineComponent({
  UsersList,
})
</script>
