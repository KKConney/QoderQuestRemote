<template>
  <div class="task-list">
    <!-- 任务列表 -->
    <div v-if="tasks.length > 0" class="tasks-container">
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggle"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- 空状态 -->
    <el-empty
      v-else
      :description="emptyDescription"
      :image-size="150"
    />
    
    <!-- 分页器 -->
    <div v-if="total > 0" class="pagination-container">
      <el-pagination
        v-model:current-page="currentPageModel"
        v-model:page-size="pageSizeModel"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    filterStatus: {
      type: String,
      default: 'all'
    },
    searchKeyword: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['toggle', 'edit', 'delete', 'page-change', 'size-change'],
  setup(props, { emit }) {
    const currentPageModel = computed({
      get: () => props.currentPage,
      set: (val) => emit('page-change', val)
    })
    
    const pageSizeModel = computed({
      get: () => props.pageSize,
      set: (val) => emit('size-change', val)
    })
    
    const emptyDescription = computed(() => {
      if (props.searchKeyword) {
        return '未找到相关任务'
      }
      if (props.filterStatus === 'active') {
        return '暂无进行中的任务'
      }
      if (props.filterStatus === 'completed') {
        return '暂无已完成的任务'
      }
      return '暂无任务，点击上方按钮添加新任务'
    })

    const handleToggle = (taskId) => {
      emit('toggle', taskId)
    }

    const handleEdit = (task) => {
      emit('edit', task)
    }

    const handleDelete = (taskId) => {
      emit('delete', taskId)
    }
    
    const handlePageChange = (page) => {
      emit('page-change', page)
    }
    
    const handleSizeChange = (size) => {
      emit('size-change', size)
    }

    return {
      emptyDescription,
      currentPageModel,
      pageSizeModel,
      handleToggle,
      handleEdit,
      handleDelete,
      handlePageChange,
      handleSizeChange
    }
  }
}
</script>

<style scoped>
.task-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  min-height: 300px;
}

.tasks-container {
  min-height: 400px;
}

/* 滚动条样式 */
.tasks-container::-webkit-scrollbar {
  width: 8px;
}

.tasks-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.tasks-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.tasks-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 分页器样式 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
