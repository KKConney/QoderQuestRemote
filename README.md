# Vue 3 TodoList 应用

一个基于 Vue 3 + Element Plus 的现代化任务管理 Web 应用。

## 功能特性

- ✅ 任务的增删改查操作
- ✅ 任务完成状态切换
- ✅ 任务优先级标记（高/中/低）
- ✅ 任务搜索功能
- ✅ 按状态过滤（全部/进行中/已完成）
- ✅ 按优先级过滤
- ✅ 数据本地持久化（LocalStorage）
- ✅ 响应式界面设计
- ✅ 现代化视觉风格
- ✅ **操作加载遮罩**（增删改查时显示加载动画，提升用户体验）

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Element Plus** - 基于 Vue 3 的组件库
- **Vite** - 下一代前端构建工具
- **JavaScript** - 编程语言

## 项目结构

```
├── public/                 # 静态资源
├── src/                   # 源代码
│   ├── assets/           # 资源文件
│   │   └── styles/       # 样式文件
│   ├── components/       # Vue 组件
│   │   ├── Header.vue    # 头部组件
│   │   ├── Toolbar.vue   # 工具栏组件
│   │   ├── TaskDialog.vue # 任务编辑对话框
│   │   ├── TaskItem.vue  # 任务项组件
│   │   ├── TaskList.vue  # 任务列表组件
│   │   ├── Footer.vue    # 底部统计组件
│   │   ├── LoadingMask.vue # 加载遮罩组件
│   │   └── TodoApp.vue   # 主应用组件
│   ├── utils/            # 工具函数
│   │   └── storage.js    # LocalStorage 操作
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口
├── index.html            # HTML 模板
├── package.json          # 项目配置
└── vite.config.js        # Vite 配置
```

## 安装依赖

```bash
npm install
```

## 开发模式运行

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

## 生产构建

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 使用说明

### 添加任务
1. 点击"添加任务"按钮
2. 填写任务标题（必填）、描述（可选）
3. 选择优先级（高/中/低）
4. 点击"添加"按钮

### 编辑任务
1. 点击任务卡片右侧的编辑按钮
2. 修改任务信息
3. 点击"保存"按钮

### 删除任务
1. 点击任务卡片右侧的删除按钮
2. 在确认对话框中点击"确定"

### 切换完成状态
- 点击任务左侧的复选框即可切换完成状态

### 搜索任务
- 在搜索框中输入关键词，系统会实时搜索任务标题和描述

### 过滤任务
- **按状态过滤**：选择"全部"、"进行中"或"已完成"
- **按优先级过滤**：从下拉框选择"全部"、"高"、"中"或"低"

### 清除已完成任务
- 点击"清除已完成"按钮，确认后将删除所有已完成的任务

## 数据持久化

应用使用浏览器的 LocalStorage 进行数据持久化，所有任务数据会自动保存在本地，刷新页面后数据不会丢失。

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
