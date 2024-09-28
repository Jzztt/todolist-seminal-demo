<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">#</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td scope="row">
            <span>{{ task.title }}</span>
          </td>
          <td @click="handleChangeStatus(task)">
            <span>{{ task.status }}</span>
          </td>
          <td><PencilLine @click="editTask(task)" /></td>
          <td><Trash @click="handleDeleteTask(task.id)" /></td>
        </tr>
      </tbody>
    </table>
    <TaskEditModal
      :showModal="showModal"
      @toggleModal="toggleModal"
      :task="selectedTask"
      @updateTask="updateTask"
    />
  </div>
</template>

<script setup>
import { taskServices } from '@/services/taskServices'
import { PencilLine, Trash } from 'lucide-vue-next'
import { ref } from 'vue'
import TaskEditModal from './TaskEditModal.vue'
const props = defineProps(['tasks', 'getTasks'])

const showModal = ref(false)

const selectedTask = ref(null)

const toggleModal = (status) => {
  showModal.value = status
}
const handleDeleteTask = async (id) => {
  const isComfirmed = window.confirm('Are you sure you want to delete this task?')
  if (isComfirmed) {
    await taskServices.deleteTask(id)
    await props.getTasks()
  }
}

const editTask = (task) => {
  selectedTask.value = task
  toggleModal(true)
}

const updateTask = async (updateTask) => {
  await taskServices.updateTask(updateTask)
  await props.getTasks()
}

const handleChangeStatus = async (task) => {
  if (task.status === 'to-do') {
    task.status = 'in-progress'
  } else if (task.status === 'in-progress') {
    task.status = 'done'
  } else {
    task.status = 'to-do'
  }

  await taskServices.updateTask(task)
  await props.getTasks()
}
</script>

<style >
</style>