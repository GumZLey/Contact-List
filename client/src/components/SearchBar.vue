<template>
  <div class="search flex items-center gap-4">
    <input
      type="text"
      placeholder="Search contacts"
      class="w-full p-2 px-4 bg-white/10 text-white border border-white rounded-lg outline-none"
      v-model="search"
    />
    <FontAwesomeIcon :icon="faSearch" class="text-white" size="lg" />
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const search = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
