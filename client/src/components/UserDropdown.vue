<template>
  <div class="relative" ref="dropdown">
    <FontAwesomeIcon
      :icon="faUser"
      class="text-white cursor-pointer hover:text-black duration-150 ease-linear"
      size="2xl"
      @click="toggleDropdown"
    />
    <transition name="fade">
      <div
        v-if="isOpen"
        class="dropdown-menu absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50"
      >
        <button
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 rounded-lg duration-150 ease-linear cursor-pointer"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { getAuth, signOut } from 'firebase/auth'
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)
const router = useRouter()
const dropdown = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

onClickOutside(dropdown, closeDropdown)

const logout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    isOpen.value = false
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>

<style scoped>
.dropdown-menu {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
