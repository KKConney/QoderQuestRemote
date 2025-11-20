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
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredTotal"
        @toggle="handleToggleTask"
        @edit="handleEditTask"
        @delete="handleDeleteTask"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
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

    <!-- 加载遮罩 -->
    <LoadingMask :visible="loading" :text="loadingText" />
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
import LoadingMask from './LoadingMask.vue'
import { saveTasks, loadTasks } from '../utils/storage.js'

export default {
  name: 'TodoApp',
  components: {
    Header,
    Toolbar,
    TaskList,
    Footer,
    TaskDialog,
    LoadingMask
  },
  setup() {
    // 状态管理
    const tasks = ref([])
    const filterStatus = ref('all')
    const filterPriority = ref('all')
    const searchKeyword = ref('')
    const dialogVisible = ref(false)
    const currentTask = ref(null)
    const loading = ref(false)
    const loadingText = ref('处理中...')
    
    // 分页相关
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 计算属性：过滤后的任务列表（分页前的完整列表）
    const filteredAllTasks = computed(() => {
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
    
    // 计算属性：当前页的任务列表
    const filteredTasks = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return filteredAllTasks.value.slice(start, end)
    })
    
    // 计算属性：过滤后的总数
    const filteredTotal = computed(() => filteredAllTasks.value.length)

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
      loading.value = true
      loadingText.value = '正在添加任务...'
      
      // 模拟异步操作
      setTimeout(() => {
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
        loading.value = false
        ElMessage.success('任务添加成功')
      }, 300)
    }

    // 更新任务
    const updateTask = (taskData) => {
      loading.value = true
      loadingText.value = '正在更新任务...'
      
      // 模拟异步操作
      setTimeout(() => {
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
          loading.value = false
          ElMessage.success('任务更新成功')
        } else {
          loading.value = false
        }
      }, 300)
    }

    // 删除任务
    const deleteTask = (taskId) => {
      ElMessageBox.confirm('确定要删除这个任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loading.value = true
        loadingText.value = '正在删除任务...'
        
        // 模拟异步操作
        setTimeout(() => {
          tasks.value = tasks.value.filter(t => t.id !== taskId)
          saveToStorage()
          loading.value = false
          ElMessage.success('任务已删除')
        }, 300)
      }).catch(() => {
        // 用户取消删除
      })
    }

    // 切换任务完成状态
    const toggleTaskStatus = (taskId) => {
      loading.value = true
      loadingText.value = '正在更新状态...'
      
      // 模拟异步操作
      setTimeout(() => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
          task.completed = !task.completed
          task.updatedAt = Date.now()
          saveToStorage()
        }
        loading.value = false
      }, 200)
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
        loading.value = true
        loadingText.value = '正在清除任务...'
        
        // 模拟异步操作
        setTimeout(() => {
          const count = completedTasks.length
          tasks.value = tasks.value.filter(t => !t.completed)
          saveToStorage()
          loading.value = false
          ElMessage.success(`已清除 ${count} 个任务`)
        }, 300)
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
      currentPage.value = 1 // 切换过滤条件时重置到第一页
    }

    const handleUpdateFilterPriority = (priority) => {
      filterPriority.value = priority
      currentPage.value = 1 // 切换过滤条件时重置到第一页
    }

    const handleUpdateSearch = (keyword) => {
      searchKeyword.value = keyword
      currentPage.value = 1 // 搜索时重置到第一页
    }
    
    const handlePageChange = (page) => {
      currentPage.value = page
    }
    
    const handleSizeChange = (size) => {
      pageSize.value = size
      currentPage.value = 1 // 改变每页数量时重置到第一页
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
      loading,
      loadingText,
      currentPage,
      pageSize,
      filteredTasks,
      filteredTotal,
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
      handleDialogSubmit,
      handlePageChange,
      handleSizeChange
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
