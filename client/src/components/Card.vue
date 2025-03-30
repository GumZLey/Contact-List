<template>
  <div class="card-container w-[340px] h-[501px] relative flex flex-col items-center justify-around bg-white/10 p-4 rounded-[25px] border-white border backdrop-blur-3xl shadow-md">
    <img 
      :src="imageUrl || fallbackImage" 
      alt="Contact Image" 
      class="rounded-full w-[145px] h-[145px] border-2 border-white object-cover" 
    />
    <article class="text-white text-[14px] font-medium leading-8">
      <h1 class="text-xl font-bold pb-8">{{ firstName }} {{ lastName }}</h1>
      <p>Mobile: {{ mobile }}</p>
      <p>Email: {{ email }}</p>
      <p>Facebook: {{ facebook }}</p>
    </article>
    <div class="btn-container flex justify-around w-full">
      <button type="button" class="cursor-pointer w-[111px] h-10 rounded-[70px] bg-[#E2ECFF]/85 hover:bg-green-200 transition-all duration-300" @click="openEditDialog">Edit</button>
      <button type="button" class="cursor-pointer w-[111px] h-10 rounded-[70px] bg-white/40 hover:bg-red-200 transition-all duration-300" @click="deleteContact">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import axios from 'axios'

const props = defineProps({
  id: String,
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  facebook: String,
  imageUrl: String,
})

const emit = defineEmits(['contact-deleted'])

const fallbackImage = 'https://th.bing.com/th/id/R.73505fb916324a07477c892ba85eac7f?rik=xb6QMoDiICcKfQ&riu=http%3a%2f%2fsignificancesystems.com%2fwp-content%2fuploads%2f2013%2f03%2fperson-011.png&ehk=h5X7uWpvbm8WWqAsoDqvEuM85qQHCKTs8LNUghfps04%3d&risl=&pid=ImgRaw&r=0'

const store = useStore()

const openEditDialog = () => {
  const contactToEdit = {
    contactID: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    phone: props.mobile,
    email: props.email,
    facebook: props.facebook,
    imageUrl: props.imageUrl,
  }
  console.log('ID :', contactToEdit.contactID)
  store.dispatch('openDialog', true)
  store.commit('setEditableContact', contactToEdit)
}

const deleteContact = async () => {
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      const response = await axios.delete(`http://localhost:3000/contacts/${props.id}`)
      if (response.status === 200) {
        emit('contact-deleted', props.id)
      } else {
        alert('Failed to delete contact.')
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('An error occurred while deleting the contact.')
    }
  }
}
</script>
