import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  // aqui almanceno mis variables reactivas que son el estado
  const count = ref(0)
  const tasks = reactive([])
  const filterByType = ref('fire')


  // aquí pongo las variables computadas
  // puede que no tenga ninguna
  // si tengo un listado  y quiero filtrarlos
  // puedo hacer una variable computada que sea filterByType 
  const doubleCount = computed(() => count.value * 2)
  const filteredTasks = computed(() => tasks.filter(task => task.type === filterByType.value))


  // ACCIONES
  // Son funciones para ser usadas desde cualquier  punto de la aplicación
  // con el objetivo de actualizar mi store
  //
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, filteredTasks }
})
