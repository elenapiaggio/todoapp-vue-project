import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getCurrentUser } from '@/services/auth.service';
import {
  getTasks as getTasksService,
  addTask as addTaskService,
  deleteTask as deleteTaskService,
  updateTaskStatus as updateTaskStatusService,

} from '@/services/task.service';

export const useTasksStore = defineStore('tasks', () => {

  // state
  const user = ref(null)
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  // computed
  const tasksCount = computed(() => tasks.value.length)

  // actions
  const loadUserAndTasks = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await getCurrentUser()
      if (user.value) {
        tasks.value = await getTasksService(user.value.id)
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTask = async (title) => {
    if (!user.value) throw new Error('User not logged in')
    loading.value = true
    error.value = null
    try {
      const newTask = await addTaskService(title, user.value.id)
      tasks.value.unshift(newTask)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id) => {
    loading.value = true
    error.value = null
    try {
      await deleteTaskService(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateTaskStatus = async (taskId, currentState) => {
    loading.value = true
    error.value = null
    try {
      const updated = await updateTaskStatusService(taskId, !currentState)
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = updated
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // aqui tengo que poner todo lo que quiero que sea accesible desde fuera
  return {
    user,
    tasks,
    loading,
    error,
    tasksCount,
    loadUserAndTasks,
    addTask,
    deleteTask,
    updateTaskStatus
  }
})
