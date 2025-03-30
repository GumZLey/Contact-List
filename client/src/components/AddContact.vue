<template>
  <section v-if="isOpen" class="overlay" aria-labelledby="dialog-title" role="dialog">
    <dialog class="dialog mx-auto my-auto flex" open>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col items-start justify-center p-4 w-full text-white placeholder-white gap-4 text-xs font-medium"
      >
        <h1 id="dialog-title" class="text-xl text-center self-center font-bold mb-4">
          {{ isEditMode ? 'Edit Contact' : 'Add Contact' }}
        </h1>
        <div>
          <label for="id">Contact ID</label>
          <input type="text" id="id" v-model="contact.contactID" required :readonly="isEditMode" />
        </div>
        <div>
          <label for="fname">First Name</label>
          <input type="text" id="fname" v-model="contact.firstName" required />
        </div>
        <div>
          <label for="lname">Last Name</label>
          <input type="text" id="lname" v-model="contact.lastName" required />
        </div>
        <div>
          <label for="phone">Mobile No</label>
          <input type="tel" id="phone" v-model="contact.phone" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="contact.email" required />
        </div>
        <div>
          <label for="facebook">Facebook</label>
          <input type="text" id="facebook" v-model="contact.facebook" />
        </div>
        <div>
          <label for="imageUrl">Image Url</label>
          <input type="url" id="imageUrl" v-model="contact.imageUrl" />
        </div>
        <div class="flex justify-around w-full h-10 text-black text-xs font-bold mt-4">
          <button
            type="submit"
            class="bg-[#E2ECFF]/85 w-30 rounded-4xl cursor-pointer hover:bg-green-200 transition-all outline-none border-none duration-300 ease-linear delay-0 hover:translate-y-[-7px] active:translate-y-[-1px]"
            aria-label="Submit {{ isEditMode ? 'Edit Contact' : 'Add Contact' }}"
          >
            {{ isEditMode ? 'Edit' : 'Add' }}
          </button>
          <button
            type="reset"
            class="bg-white/42 w-30 rounded-4xl cursor-pointer hover:bg-red-200 transition-all outline-none border-none duration-300 ease-linear delay-0 hover:translate-y-[-7px] active:translate-y-[-1px]"
            @click="resetForm"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const emit = defineEmits(['contact-added', 'contact-edited', 'close'])
const store = useStore()
const isOpen = computed(() => store.getters.isDialogOpen)
const isEditMode = computed(() => store.getters.isEditMode)

const contact = ref({ ...store.getters.editableContact })

const handleContactEdited = async (editedContact) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/contacts/${editedContact.contactID}`,
      editedContact,
    )
    console.log("Edited contact:", editedContact)
    if (response.status === 200) {
      emit('contact-edited', response.data)
      console.log('Contact edited and updated in the database and UI:', response.data)
    } else {
      console.error('Failed to update contact in the database:', response.statusText)
    }
  } catch (error) {
    console.error('Error updating contact in the database:', error)
  }
}

const handleSubmit = async () => {
  if (isEditMode.value) {
    emit('contact-edited', { ...contact.value })
    await handleContactEdited(contact.value)
  } else {
    emit('contact-added', { ...contact.value })
  }
  resetForm()
}

const resetForm = () => {
  if (isEditMode.value) {
    contact.value = { ...store.getters.editableContact }
  } else {
    contact.value = {
      contactID: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      facebook: '',
      imageUrl: '',
    }
  }
  emit('close')
  store.dispatch('closeDialog')
}

watch(
  () => store.getters.editableContact,
  (newValue) => {
    if (isEditMode.value) {
      contact.value = { ...newValue }
    } else {
      contact.value = {
        contactID: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        facebook: '',
        imageUrl: '',
      }
    }
  },
  { immediate: true },
)
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
  width: 464px;
  height: 720px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
form > div:not(:last-child) {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form > div > input {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  border-radius: 82px;
  padding: 0.5rem 1rem;
}

form > div > label {
  padding-left: 1rem;
}
</style>
