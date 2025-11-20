/**
 * LocalStorage 工具函数
 * 用于任务数据的持久化存储
 */

const STORAGE_KEY = 'vue_todolist_tasks'

/**
 * 保存任务列表到 LocalStorage
 * @param {Array} tasks - 任务数组
 */
export function saveTasks(tasks) {
  try {
    const jsonString = JSON.stringify(tasks)
    localStorage.setItem(STORAGE_KEY, jsonString)
  } catch (error) {
    console.error('保存任务数据失败:', error)
  }
}

/**
 * 从 LocalStorage 加载任务列表
 * @returns {Array} 任务数组，如果加载失败或无数据则返回空数组
 */
export function loadTasks() {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY)
    if (!jsonString) {
      return []
    }
    const tasks = JSON.parse(jsonString)
    return Array.isArray(tasks) ? tasks : []
  } catch (error) {
    console.error('加载任务数据失败:', error)
    return []
  }
}

/**
 * 清空 LocalStorage 中的任务数据
 */
export function clearTasks() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('清空任务数据失败:', error)
  }
}
