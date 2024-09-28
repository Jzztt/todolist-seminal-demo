<template>
  <div class="d-flex">
    <input v-model="task.title" type="text" placeholder="Enter Task" />
    <button @click="addTask" class="btn btn-primary">Submit</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const task = ref({
  title: '',
  status: 'to-do'
})
const emit = defineEmits()
const addTask = () => {
  if (task.value.title) {
    emit('add-task', task.value)
    task.value = {
      title: '',
      status: 'to-do'
    }
  }
}
</script>

<style scoped>
</style>