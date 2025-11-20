# 项目部署和运行说明

## 📋 前置要求

在开始之前，请确保你的系统已安装以下软件：

- **Node.js** (版本 >= 16.0.0)
  - 下载地址: https://nodejs.org/
  - 验证安装: `node --version`
  
- **npm** (通常随 Node.js 一起安装)
  - 验证安装: `npm --version`

## 🚀 快速开始

### 1. 安装依赖

在项目根目录下执行：

```bash
npm install
```

这将安装以下核心依赖：
- Vue 3 (前端框架)
- Element Plus (UI 组件库)
- @element-plus/icons-vue (图标库)
- Vite (构建工具)

### 2. 启动开发服务器

```bash
npm run dev
```

执行成功后，你将看到类似以下输出：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

在浏览器中打开 `http://localhost:5173` 即可访问应用。

### 3. 生产环境构建

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 4. 预览生产构建

```bash
npm run preview
```

## 📱 应用功能演示

### 基本操作

1. **添加新任务**
   - 点击顶部的"添加任务"按钮
   - 填写任务标题（必填）
   - 选填任务描述
   - 选择优先级（高/中/低）
   - 点击"添加"完成

2. **编辑任务**
   - 点击任务卡片右侧的编辑按钮（铅笔图标）
   - 修改任务信息
   - 点击"保存"

3. **删除任务**
   - 点击任务卡片右侧的删除按钮（垃圾桶图标）
   - 确认删除操作

4. **标记完成**
   - 点击任务左侧的复选框
   - 已完成的任务会显示删除线并降低透明度

### 高级功能

1. **搜索任务**
   - 在搜索框中输入关键词
   - 实时过滤显示匹配的任务

2. **按状态过滤**
   - 全部：显示所有任务
   - 进行中：仅显示未完成的任务
   - 已完成：仅显示已完成的任务

3. **按优先级过滤**
   - 从下拉框选择优先级
   - 支持高、中、低三个级别

4. **批量清理**
   - 点击"清除已完成"按钮
   - 一键删除所有已完成的任务

## 💾 数据存储

应用使用浏览器的 LocalStorage 进行数据持久化：

- 所有任务数据自动保存在浏览器本地
- 刷新页面后数据不会丢失
- 不同浏览器的数据相互独立
- 清除浏览器缓存会删除任务数据

## 🎨 界面特点

- **现代化设计**: 采用渐变色背景和卡片式布局
- **响应式布局**: 支持桌面、平板和移动设备
- **流畅动画**: 悬停效果和过渡动画
- **直观反馈**: 操作成功/失败都有消息提示
- **优先级标识**: 不同优先级用不同颜色标签区分
  - 高优先级：红色 (Danger)
  - 中优先级：橙色 (Warning)
  - 低优先级：蓝色 (Info)

## 🔧 常见问题

### 问题 1: npm install 失败

**解决方案**:
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 2: 端口 5173 被占用

**解决方案**:
在 `vite.config.js` 中修改端口：
```javascript
server: {
  port: 3000, // 改为其他端口
  open: true
}
```

### 问题 3: 数据丢失

**原因**: 清除了浏览器缓存或使用了隐私模式

**预防**: 未来可以添加云端同步功能

## 📦 项目结构说明

```
QoderQuestRemote/
├── public/               # 静态资源（如图标）
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css  # 全局样式
│   ├── components/       # Vue 组件
│   │   ├── Header.vue    # 顶部标题栏
│   │   ├── Toolbar.vue   # 工具栏（搜索、过滤）
│   │   ├── TaskDialog.vue # 任务编辑对话框
│   │   ├── TaskItem.vue  # 单个任务卡片
│   │   ├── TaskList.vue  # 任务列表容器
│   │   ├── Footer.vue    # 底部统计栏
│   │   └── TodoApp.vue   # 主应用组件
│   ├── utils/
│   │   └── storage.js    # LocalStorage 操作封装
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口
├── index.html            # HTML 模板
├── package.json          # 项目依赖配置
├── vite.config.js        # Vite 构建配置
└── README.md             # 项目说明
```

## 🌐 浏览器支持

- ✅ Chrome (推荐，最佳体验)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ IE (不支持)

## 📝 技术亮点

1. **Vue 3 Composition API**: 使用现代化的组合式 API 进行状态管理
2. **组件化架构**: 高内聚低耦合的组件设计
3. **响应式数据流**: 利用 computed 和 watch 实现高效的数据更新
4. **Element Plus 集成**: 完整的 UI 组件库支持
5. **LocalStorage 持久化**: 无需后端即可保存数据

## 🚀 后续扩展方向

- [ ] 添加任务分类/标签功能
- [ ] 支持任务截止日期设置
- [ ] 添加任务排序功能（按时间、优先级）
- [ ] 数据导出功能（JSON/CSV）
- [ ] 主题切换（亮色/暗色模式）
- [ ] 集成后端 API 实现云端同步
- [ ] 多语言国际化支持

## 📄 许可证

MIT License

## 💬 联系支持

如有问题或建议，欢迎提交 Issue。
