<script setup>
import { onMounted, ref } from 'vue'
import TaskInput from './components/TaskInput.vue'
import TaskList from './components/TaskList.vue'
import { taskServices } from './services/taskServices'

const tasks = ref([])

const getTasks = async () => {
  const data = await taskServices.getTasks()
  tasks.value = data
}
const addTask = async (task) => {
  await taskServices.addTask(task)
  await getTasks()
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <div class="container">
    <h1 class="text-center mt-5">My Vue Todo App</h1>
    <TaskInput @add-task="addTask" />
    <TaskList :tasks="tasks" :getTasks="getTasks" />
  </div>
</template>

<style scoped>
</style>
