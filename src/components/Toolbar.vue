<template>
  <div class="toolbar">
    <div class="toolbar-row">
      <!-- 添加任务按钮 -->
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        添加任务
      </el-button>

      <!-- 搜索框 -->
      <el-input
        v-model="searchValue"
        placeholder="搜索任务..."
        :prefix-icon="Search"
        clearable
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <div class="toolbar-row">
      <!-- 状态过滤器 -->
      <div class="filter-group">
        <span class="filter-label">状态：</span>
        <el-radio-group v-model="statusValue" @change="handleStatusChange">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="active">进行中</el-radio-button>
          <el-radio-button label="completed">已完成</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 优先级过滤器 -->
      <div class="filter-group">
        <span class="filter-label">优先级：</span>
        <el-select 
          v-model="priorityValue" 
          placeholder="选择优先级"
          @change="handlePriorityChange"
          style="width: 140px"
        >
          <el-option label="全部" value="all" />
          <el-option label="高" value="high" />
          <el-option label="中" value="medium" />
          <el-option label="低" value="low" />
        </el-select>
      </div>

      <!-- 清除已完成按钮 -->
      <el-button type="danger" plain :icon="Delete" @click="handleClearCompleted">
        清除已完成
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Plus, Search, Delete } from '@element-plus/icons-vue'

export default {
  name: 'Toolbar',
  components: {
    Plus,
    Search,
    Delete
  },
  props: {
    filterStatus: {
      type: String,
      default: 'all'
    },
    filterPriority: {
      type: String,
      default: 'all'
    },
    searchKeyword: {
      type: String,
      default: ''
    }
  },
  emits: ['add-task', 'update-filter-status', 'update-filter-priority', 'update-search', 'clear-completed'],
  setup(props, { emit }) {
    const searchValue = ref(props.searchKeyword)
    const statusValue = ref(props.filterStatus)
    const priorityValue = ref(props.filterPriority)

    const handleAdd = () => {
      emit('add-task')
    }

    const handleSearch = (value) => {
      emit('update-search', value)
    }

    const handleStatusChange = (value) => {
      emit('update-filter-status', value)
    }

    const handlePriorityChange = (value) => {
      emit('update-filter-priority', value)
    }

    const handleClearCompleted = () => {
      emit('clear-completed')
    }

    return {
      Plus,
      Search,
      Delete,
      searchValue,
      statusValue,
      priorityValue,
      handleAdd,
      handleSearch,
      handleStatusChange,
      handlePriorityChange,
      handleClearCompleted
    }
  }
}
</script>

<style scoped>
.toolbar {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.toolbar-row + .toolbar-row {
  margin-top: 15px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

@media (max-width: 768px) {
  .toolbar-row {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    max-width: 100%;
  }

  .filter-group {
    justify-content: space-between;
  }
}
</style>
