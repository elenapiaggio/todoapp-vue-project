import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  createAccount as createAccountService,
  login as loginService,
  logout as logoutService,
  getCurrentUser as getCurrentUserService
} from '@/services/auth.service';

export const useAuthStore = defineStore('auth', () => {

  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed


  // Actions
  const loadCurrentUser = async () => {
    loading.value = true;
    error.value = null;

    try {
      user.value = await getCurrentUserService();
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  const createAccount = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const data = await createAccountService(email, password)
      user.value = data.user // puede ser null si requiere verificación por email
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const data = await loginService(email, password)
      user.value = data.user
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      await logoutService()
      user.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // lo que expongo
  return {
    user,
    loading,
    error,
    loadCurrentUser,
    createAccount,
    login,
    logout
  }
})