<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑任务' : '添加任务'"
    width="500px"
    @close="handleClose"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="任务标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入任务标题"
          maxlength="100"
          show-word-limit
          clearable
        />
      </el-form-item>

      <el-form-item label="任务描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入任务描述（可选）"
          :rows="4"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="formData.priority">
          <el-radio label="high">高</el-radio>
          <el-radio label="medium">中</el-radio>
          <el-radio label="low">低</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          {{ isEdit ? '保存' : '添加' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue'

export default {
  name: 'TaskDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: null
    }
  },
  emits: ['update:visible', 'submit'],
  setup(props, { emit }) {
    const dialogVisible = ref(props.visible)
    const formRef = ref(null)
    const isEdit = ref(false)

    const formData = reactive({
      title: '',
      description: '',
      priority: 'medium'
    })

    const rules = {
      title: [
        { required: true, message: '请输入任务标题', trigger: 'blur' },
        { min: 1, max: 100, message: '标题长度在 1 到 100 个字符', trigger: 'blur' }
      ]
    }

    // 监听 visible 属性变化
    watch(() => props.visible, (newVal) => {
      dialogVisible.value = newVal
      if (newVal) {
        // 如果是编辑模式，填充表单数据
        if (props.task) {
          isEdit.value = true
          formData.title = props.task.title
          formData.description = props.task.description || ''
          formData.priority = props.task.priority
        } else {
          isEdit.value = false
          resetForm()
        }
      }
    })

    // 监听 dialogVisible 变化，同步到父组件
    watch(dialogVisible, (newVal) => {
      emit('update:visible', newVal)
    })

    const resetForm = () => {
      formData.title = ''
      formData.description = ''
      formData.priority = 'medium'
      if (formRef.value) {
        formRef.value.clearValidate()
      }
    }

    const handleClose = () => {
      dialogVisible.value = false
      resetForm()
    }

    const handleSubmit = async () => {
      if (!formRef.value) return

      await formRef.value.validate((valid) => {
        if (valid) {
          const taskData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            priority: formData.priority
          }

          if (isEdit.value && props.task) {
            taskData.id = props.task.id
          }

          emit('submit', taskData)
          handleClose()
        }
      })
    }

    return {
      dialogVisible,
      formRef,
      formData,
      rules,
      isEdit,
      handleClose,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
