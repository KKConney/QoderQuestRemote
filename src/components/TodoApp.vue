<template>
  <div class="todo-app">
    <!-- 头部 -->
    <Header />

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 工具栏 -->
      <Toolbar
        :filter-status="filterStatus"
        :filter-priority="filterPriority"
        :search-keyword="searchKeyword"
        @add-task="handleAddTask"
        @update-filter-status="handleUpdateFilterStatus"
        @update-filter-priority="handleUpdateFilterPriority"
        @update-search="handleUpdateSearch"
        @clear-completed="handleClearCompleted"
      />

      <!-- 任务列表 -->
      <TaskList
        :tasks="filteredTasks"
        :filter-status="filterStatus"
        :search-keyword="searchKeyword"
        @toggle="handleToggleTask"
        @edit="handleEditTask"
        @delete="handleDeleteTask"
      />

      <!-- 底部统计 -->
      <Footer
        :total-count="totalCount"
        :completed-count="completedCount"
        :active-count="activeCount"
      />
    </div>

    <!-- 任务编辑对话框 -->
    <TaskDialog
      v-model:visible="dialogVisible"
      :task="currentTask"
      @submit="handleDialogSubmit"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Header from './Header.vue'
import Toolbar from './Toolbar.vue'
import TaskList from './TaskList.vue'
import Footer from './Footer.vue'
import TaskDialog from './TaskDialog.vue'
import { saveTasks, loadTasks } from '../utils/storage.js'

export default {
  name: 'TodoApp',
  components: {
    Header,
    Toolbar,
    TaskList,
    Footer,
    TaskDialog
  },
  setup() {
    // 状态管理
    const tasks = ref([])
    const filterStatus = ref('all')
    const filterPriority = ref('all')
    const searchKeyword = ref('')
    const dialogVisible = ref(false)
    const currentTask = ref(null)

    // 计算属性：过滤后的任务列表
    const filteredTasks = computed(() => {
      let result = tasks.value

      // 按状态过滤
      if (filterStatus.value === 'active') {
        result = result.filter(task => !task.completed)
      } else if (filterStatus.value === 'completed') {
        result = result.filter(task => task.completed)
      }

      // 按优先级过滤
      if (filterPriority.value !== 'all') {
        result = result.filter(task => task.priority === filterPriority.value)
      }

      // 按关键词搜索
      if (searchKeyword.value.trim()) {
        const keyword = searchKeyword.value.toLowerCase()
        result = result.filter(task => {
          const titleMatch = task.title.toLowerCase().includes(keyword)
          const descMatch = task.description && task.description.toLowerCase().includes(keyword)
          return titleMatch || descMatch
        })
      }

      return result
    })

    // 计算属性：统计数据
    const totalCount = computed(() => tasks.value.length)
    const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
    const activeCount = computed(() => tasks.value.filter(t => !t.completed).length)

    // 保存到 LocalStorage
    const saveToStorage = () => {
      saveTasks(tasks.value)
    }

    // 从 LocalStorage 加载
    const loadFromStorage = () => {
      const loadedTasks = loadTasks()
      tasks.value = loadedTasks
    }

    // 添加任务
    const addTask = (taskData) => {
      const newTask = {
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      tasks.value.unshift(newTask)
      saveToStorage()
      ElMessage.success('任务添加成功')
    }

    // 更新任务
    const updateTask = (taskData) => {
      const index = tasks.value.findIndex(t => t.id === taskData.id)
      if (index !== -1) {
        tasks.value[index] = {
          ...tasks.value[index],
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          updatedAt: Date.now()
        }
        saveToStorage()
        ElMessage.success('任务更新成功')
      }
    }

    // 删除任务
    const deleteTask = (taskId) => {
      ElMessageBox.confirm('确定要删除这个任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tasks.value = tasks.value.filter(t => t.id !== taskId)
        saveToStorage()
        ElMessage.success('任务已删除')
      }).catch(() => {
        // 用户取消删除
      })
    }

    // 切换任务完成状态
    const toggleTaskStatus = (taskId) => {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        task.updatedAt = Date.now()
        saveToStorage()
      }
    }

    // 清除所有已完成任务
    const clearCompleted = () => {
      const completedTasks = tasks.value.filter(t => t.completed)
      if (completedTasks.length === 0) {
        ElMessage.info('暂无已完成的任务')
        return
      }

      ElMessageBox.confirm(`确定要清除所有已完成的任务吗？（共 ${completedTasks.length} 个）`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const count = completedTasks.length
        tasks.value = tasks.value.filter(t => !t.completed)
        saveToStorage()
        ElMessage.success(`已清除 ${count} 个任务`)
      }).catch(() => {
        // 用户取消
      })
    }

    // 事件处理器
    const handleAddTask = () => {
      currentTask.value = null
      dialogVisible.value = true
    }

    const handleEditTask = (task) => {
      currentTask.value = task
      dialogVisible.value = true
    }

    const handleDeleteTask = (taskId) => {
      deleteTask(taskId)
    }

    const handleToggleTask = (taskId) => {
      toggleTaskStatus(taskId)
    }

    const handleClearCompleted = () => {
      clearCompleted()
    }

    const handleUpdateFilterStatus = (status) => {
      filterStatus.value = status
    }

    const handleUpdateFilterPriority = (priority) => {
      filterPriority.value = priority
    }

    const handleUpdateSearch = (keyword) => {
      searchKeyword.value = keyword
    }

    const handleDialogSubmit = (taskData) => {
      if (taskData.id) {
        // 编辑模式
        updateTask(taskData)
      } else {
        // 添加模式
        addTask(taskData)
      }
    }

    // 生命周期钩子
    onMounted(() => {
      loadFromStorage()
    })

    // 监听任务变化，自动保存
    watch(tasks, () => {
      saveToStorage()
    }, { deep: true })

    return {
      tasks,
      filterStatus,
      filterPriority,
      searchKeyword,
      dialogVisible,
      currentTask,
      filteredTasks,
      totalCount,
      completedCount,
      activeCount,
      handleAddTask,
      handleEditTask,
      handleDeleteTask,
      handleToggleTask,
      handleClearCompleted,
      handleUpdateFilterStatus,
      handleUpdateFilterPriority,
      handleUpdateSearch,
      handleDialogSubmit
    }
  }
}
</script>

<style scoped>
.todo-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}
</style>
