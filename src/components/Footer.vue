<template>
  <div class="footer">
    <div class="footer-content">
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">总任务：</span>
          <el-badge :value="totalCount" class="stat-badge" type="primary" />
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">已完成：</span>
          <el-badge :value="completedCount" class="stat-badge" type="success" />
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">进行中：</span>
          <el-badge :value="activeCount" class="stat-badge" type="warning" />
        </div>
      </div>
      <div class="footer-info">
        <span class="completion-rate" v-if="totalCount > 0">
          完成率：{{ completionRate }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    completedCount: {
      type: Number,
      default: 0
    },
    activeCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const completionRate = computed(() => {
      if (props.totalCount === 0) return 0
      return Math.round((props.completedCount / props.totalCount) * 100)
    })

    return {
      completionRate
    }
  }
}
</script>

<style scoped>
.footer {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.stat-badge {
  font-size: 16px;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 20px;
  background-color: #dcdfe6;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.completion-rate {
  font-size: 14px;
  color: #409eff;
  font-weight: 600;
  padding: 5px 12px;
  background-color: #ecf5ff;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats {
    flex-wrap: wrap;
  }
}
</style>
