<template>
  <main class="flex flex-col items-center justify-center h-screen bg-[#0F003C] font-[Roboto]">
    <div
      class="flex flex-col items-center justify-center bg-white/10 p-8 rounded-[25px] border-white border w-[553px] h-[492px] backdrop-blur-3xl shadow-md"
    >
      <form
        action="/contacts"
        method="get"
        class="w-[80%] flex flex-col items-center justify-around p-4 h-full"
        @submit="signIn"
      >
        <h1 class="text-4xl text-white font-bold">Welcome User</h1>
        <div class="input-container w-full text-white">
          <div class="flex flex-col pb-8 font-medium">
            <label for="username" class="pb-1 text-xs">User Account</label>
            <div class="flex justify-between pb-2">
              <input
                type="text"
                id="username"
                name="username"
                required
                class="w-full outline-none"
                v-model="username"
              />
              <FontAwesomeIcon :icon="faUser" class="" />
            </div>
            <hr class="" />
          </div>
          <div class="flex flex-col">
            <label for="password" class="pb-1 text-xs">Password</label>
            <div class="flex justify-between pb-2">
              <input
                type="password"
                id="password"
                name="password"
                required
                class="w-full outline-none"
                v-model="password"
              />
              <FontAwesomeIcon :icon="faLock" class="" />
            </div>
          </div>
          <hr class=" " />
        </div>
        <button
          type="submit"
          class="w-full h-12 bg-white rounded-[100px] text-2xl font-bold hover:bg-purple-400 hover:text-white transition-all outline-none border-none duration-300 ease-linear delay-0 hover:translate-y-[-7px] active:translate-y-[-1px] cursor-pointer"
        >
          Login
        </button>
      </form>
      <GoogleIcon @click="signInWithGoogle" />
    </div>
    <ErrorDialog :isOpen="isErrorDialogOpen" @close="isErrorDialogOpen = false" />
  </main>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import GoogleIcon from './GoogleIcon.vue'
import ErrorDialog from './ErrorDialog.vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import md5 from 'md5'
import { ref } from 'vue'
import axios from 'axios'

const router = useRouter()

const auth = getAuth()
const provider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    console.log('User signed in: ', user)
    localStorage.setItem('authToken', 'google-auth-token')
    router.push('/contacts')
  } catch (error) {
    console.error('Error signing in with Google: ', error)
  }
}

const username = ref('')
const password = ref('')
const isErrorDialogOpen = ref(false)

const signIn = async (event) => {
  event.preventDefault()
  const hashedPassword = md5(password.value)
  try {
    const response = await axios.post('http://localhost:3000/signIn', {
      username: username.value,
      password: hashedPassword,
    })
    if (response.status === 200) {
      localStorage.setItem('authToken', 'user-auth-token')
      router.push('/contacts')
    } else {
      console.error('Error signing in: Invalid credentials')
      isErrorDialogOpen.value = true
    }
  } catch (error) {
    console.error('Error signing in: ', error)
    isErrorDialogOpen.value = true
  }
}
</script>
