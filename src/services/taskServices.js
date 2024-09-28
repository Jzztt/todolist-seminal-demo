import axiosInstance from '@/config/axiosConfig'
const getTasks = async () => {
  try {
    const { data } = await axiosInstance.get('/tasks')
    return data
  } catch (error) {
    console.log(error)
  }
}
const addTask = async (task) => {
  try {
    const { data } = await axiosInstance.post('/tasks', task)
    return data
  } catch (error) {
    console.log(error)
  }
}
const deleteTask = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/tasks/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateTask = async (task) => {
  try {
    const { data } = await axiosInstance.put(`/tasks/${task.id}`, task)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const taskServices = {
  getTasks,
  addTask,
  deleteTask,
  updateTask
}
