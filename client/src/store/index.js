import { createStore } from 'vuex'

export default createStore({
  state: {
    isOpen: false,
    isEditMode: false,
    editableContact: {},
    searchQuery: '',
  },
  mutations: {
    setDialogState(state, isOpen) {
      state.isOpen = isOpen
    },
    setEditMode(state, isEditMode) {
      state.isEditMode = isEditMode
    },
    setEditableContact(state, contact) {
      state.editableContact = contact
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
  },
  actions: {
    openDialog({ commit }, isEditMode = false) {
      commit('setDialogState', true)
      commit('setEditMode', isEditMode)
    },
    closeDialog({ commit }) {
      commit('setDialogState', false)
      commit('setEditMode', false)
      commit('setEditableContact', {})
    },
  },
  getters: {
    isDialogOpen: (state) => state.isOpen,
    isEditMode: (state) => state.isEditMode,
    editableContact: (state) => state.editableContact,
    searchQuery: (state) => state.searchQuery,
  },
})
