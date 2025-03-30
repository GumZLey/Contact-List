<template>
  <div v-if="isOpen" class="overlay">
    <dialog class="dialog m-auto" open>
      <div class="flex flex-col items-center justify-center text-center">
        <FontAwesomeIcon :icon="faExclamationCircle" class="text-red-500 text-6xl mb-4" />
        <h2 class="text-white text-xl font-bold mb-2">Login Failed</h2>
        <p class="text-white text-sm">The username or password you entered is incorrect.</p>
        <button
          class="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all cursor-pointer"
          @click="closeDialog"
        >
          Close
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const closeDialog = () => {
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
