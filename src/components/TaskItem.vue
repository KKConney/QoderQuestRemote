<template>
  <el-card class="task-item" :class="{ 'completed': task.completed }" shadow="hover">
    <div class="task-content">
      <!-- 左侧：完成状态复选框 -->
      <div class="task-checkbox">
        <el-checkbox
          :model-value="task.completed"
          @change="handleToggle"
          size="large"
        />
      </div>

      <!-- 中间：任务信息 -->
      <div class="task-info">
        <div class="task-title" :class="{ 'completed-text': task.completed }">
          {{ task.title }}
        </div>
        <div v-if="task.description" class="task-description">
          {{ task.description }}
        </div>
        <div class="task-meta">
          <span class="task-time">创建于 {{ formatTime(task.createdAt) }}</span>
        </div>
      </div>

      <!-- 右侧：优先级标签和操作按钮 -->
      <div class="task-actions">
        <el-tag :type="getPriorityType(task.priority)" size="small" class="priority-tag">
          {{ getPriorityText(task.priority) }}
        </el-tag>
        <div class="action-buttons">
          <el-button
            :icon="Edit"
            circle
            size="small"
            @click="handleEdit"
            title="编辑"
          />
          <el-button
            :icon="Delete"
            circle
            size="small"
            type="danger"
            @click="handleDelete"
            title="删除"
          />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Edit, Delete } from '@element-plus/icons-vue'

export default {
  name: 'TaskItem',
  components: {
    Edit,
    Delete
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'edit', 'delete'],
  setup(props, { emit }) {
    const handleToggle = () => {
      emit('toggle', props.task.id)
    }

    const handleEdit = () => {
      emit('edit', props.task)
    }

    const handleDelete = () => {
      emit('delete', props.task.id)
    }

    const getPriorityType = (priority) => {
      const typeMap = {
        high: 'danger',
        medium: 'warning',
        low: 'info'
      }
      return typeMap[priority] || 'info'
    }

    const getPriorityText = (priority) => {
      const textMap = {
        high: '高',
        medium: '中',
        low: '低'
      }
      return textMap[priority] || '中'
    }

    const formatTime = (timestamp) => {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    return {
      Edit,
      Delete,
      handleToggle,
      handleEdit,
      handleDelete,
      getPriorityType,
      getPriorityText,
      formatTime
    }
  }
}
</script>

<style scoped>
.task-item {
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.task-item.completed {
  opacity: 0.7;
  background-color: #f5f7fa;
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.task-checkbox {
  flex-shrink: 0;
  padding-top: 2px;
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 8px;
  word-wrap: break-word;
}

.task-title.completed-text {
  text-decoration: line-through;
  color: #909399;
}

.task-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  word-wrap: break-word;
  line-height: 1.5;
}

.task-meta {
  font-size: 12px;
  color: #909399;
}

.task-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.priority-tag {
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .task-content {
    flex-wrap: wrap;
  }

  .task-actions {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
