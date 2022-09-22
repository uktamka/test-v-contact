<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      :style="{ minWidth: '350px' }"
    >
      <q-input
        filled
        v-model="name"
        label="Name contact *"
        hint="Name and surname"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type Name contact']"
      />

      <q-input
        filled
        v-model="username"
        label="Nick contact *"
        hint="Nick"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type Nick']"
      />

      <q-select
        filled
        v-model="tag"
        label="Tag contact *"
        hint="Tag"
        option-value="id"
        option-label="name"
        emit-value
        map-options
        :options="tagStore.tags"
        :rules="[(v) => ruleNoEmpty(v) || 'Please select something']"
      />

      <q-input
        filled
        v-model="email"
        label="email contact *"
        hint="email"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type email']"
      />

      <q-input
        filled
        v-model="city"
        label="city contact *"
        hint="city"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type city']"
      />

      <q-input
        filled
        v-model="street"
        label="street contact *"
        hint="street"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type street']"
      />
      <q-input
        filled
        v-model="suite"
        label="suite contact *"
        hint="suite"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type suite']"
      />
      <q-input
        filled
        v-model="phone"
        label="phone contact *"
        hint="phone"
        lazy-rules
        :rules="[(v) => ruleNoEmpty(v) || 'Please type phone']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from 'src/types'
import { useTagStore } from 'src/stores/UsersTags'

const tagStore = useTagStore()
const props = defineProps<{ user?: User }>()
const emit = defineEmits<{ (e: 'submit', user: Partial<User>): void }>()

const name = ref<string>('')
const username = ref<string>('')
const tag = ref<number | null>(null)
const email = ref<string>('')
const city = ref<string>('')
const street = ref<string>('')
const suite = ref<string>('')
const phone = ref<string>('')

const ruleNoEmpty = (val: any) =>
  val !== null && val !== '' && val !== undefined

const onSubmit = (): void => {
  const data: Partial<User> = {
    name: name.value,
    username: username.value,
    tag: tag.value as number,
    email: email.value,
    address: {
      city: city.value,
      street: street.value,
      suite: suite.value,
    },
    phone: phone.value,
  }
  if (props.user?.id) {
    data.id = props.user.id
  }
  emit('submit', data)
}

onMounted(() => {
  if (props.user) {
    name.value = props.user.name
    username.value = props.user.username
    tag.value = props.user.tag
    email.value = props.user.email
    city.value = props.user.address.city
    street.value = props.user.address.street
    suite.value = props.user.address.suite
    phone.value = props.user.phone
  }
})
</script>
