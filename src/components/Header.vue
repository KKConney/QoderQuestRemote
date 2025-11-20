<template>
  <div class="header">
    <div class="header-content">
      <el-icon :size="32" class="header-icon">
        <Document />
      </el-icon>
      <h1 class="header-title">我的任务清单</h1>
    </div>
  </div>
</template>

<script>
import { Document } from '@element-plus/icons-vue'

export default {
  name: 'Header',
  components: {
    Document
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icon {
  color: white;
}

.header-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
