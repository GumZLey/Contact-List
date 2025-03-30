<script setup>
import Card from '@/components/Card.vue'
import AddContact from '@/components/AddContact.vue'
import SearchBar from '@/components/SearchBar.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const store = useStore()
const contacts = ref([])

const fetchContacts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/contacts')
    contacts.value = response.data
  } catch (error) {
    console.error('Error fetching contacts:', error)
  }
}

const filteredContacts = computed(() => {
  const searchQuery = store.getters.searchQuery // Use getter for search query
  if (!searchQuery) return contacts.value
  return contacts.value.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
})

const openAddContactDialog = () => {
  store.commit('setEditableContact', null) // Clear the editableContact in the store
  store.dispatch('openDialog', false) // Open dialog in add mode
}

onMounted(() => {
  fetchContacts()
})

const handleContactAdded = async (newContact) => {
  try {
    const response = await axios.post('http://localhost:3000/contacts', newContact)
    if (response.status === 201) {
      contacts.value.push(response.data) // Add the new contact to the local state
      fetchContacts()
      store.dispatch('closeDialog') // Close the dialog using the store
    } else {
      console.error('Failed to add contact:', response.statusText)
    }
  } catch (error) {
    console.error('Error adding contact:', error)
  }
}

const handleContactEdited = (updatedContact) => {
  const index = contacts.value.findIndex(contact => contact._id === updatedContact._id)
  if (index !== -1) {
    contacts.value.splice(index, 1, updatedContact) // Update the contact in the local state
  }
}

const handleContactDeleted = (id) => {
  contacts.value = contacts.value.filter(contact => contact._id !== id)
}
</script>

<template>
  <header class="relative flex flex-row justify-between items-center p-2 m-6 h-20 mx-20 px-20 bg-white/10 rounded-[82px] text-white font-bold shadow-xl">
    <h2>SINK UMBRELLA</h2>
    <div class="flex flex-row justify-between items-center gap-10">
      <SearchBar v-model="store.state.searchQuery" />
      <FontAwesomeIcon :icon="faPlus" class="text-white cursor-pointer hover:text-black duration-150 ease-linear" size="2xl" @click="openAddContactDialog" />
      <UserDropdown />
    </div>
  </header>
  <main>
    <div class="card-container flex flex-row justify-center flex-wrap gap-15 p-10">
      <Card
        v-for="contact in filteredContacts"
        :key="contact._id"
        :id="contact._id"
        :firstName="contact.firstName"
        :last-name="contact.lastName"
        :mobile="contact.phone"
        :email="contact.email"
        :facebook="contact.facebook"
        :imageUrl="contact.imageUrl"
        @contact-deleted="handleContactDeleted"
      />
    </div>
    <AddContact @contact-added="handleContactAdded" @contact-edited="handleContactEdited" />
  </main>
</template>