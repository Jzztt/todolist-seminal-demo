import { taskServices } from '@/services/taskServices'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: [],
      loading: false,
      error: null
    }
  },
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const fetchTasksResponse = await taskServices.getTasks()
        this.tasks = fetchTasksResponse.tasks
        toast.success(fetchTasksResponse.message)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async createTask(newTask) {
      const createTaskResponse = await taskServices.addTask(newTask)
      // await this.fetchTasks()
      if (!createTaskResponse.success) {
        toast.error(createTaskResponse.message)
        return
      }
      this.tasks.push(createTaskResponse.task)
      toast.success(createTaskResponse.message)
    },
    async deleteTask(taskId) {
      const deleteTaskResponse = await taskServices.deleteTask(taskId)
      // await this.fetchTasks()
      if (!deleteTaskResponse.success) {
        toast.error(deleteTaskResponse.message)
        return
      }
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      toast.success(deleteTaskResponse.message)
    },
    async updateTask(updatedTask) {
      const updateTaskResponse = await taskServices.updateTask(updatedTask)
      // await this.fetchTasks()
      if (!updateTaskResponse.success) {
        toast.error(updateTaskResponse.message)
        return
      }
      const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id)
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1, updatedTask)
      }
      toast.success(updateTaskResponse.message)
    }
  }
})
