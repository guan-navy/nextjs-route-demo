# 项目变更记录

## 2024-12-19: 优化数据获取方式

新闻列表数据获取方式从 HTTP 请求改为直接调用数据库方法

### 改动内容

- 移除 `http://localhost:8080/news` 接口调用
- 改用 `getAllNews()` 方法直接获取数据

### 代码变更

```typescript
// 变更前
const response = await fetch("http://localhost:8080/news");
const news = await response.json();

// 变更后
const news = getAllNews();
```

### 变更说明

- 简化项目架构,提升性能
- 适用于当前小型项目需求
- 后续可按需改回 API 方式

---

## Loading 状态处理

Next.js 13+ 支持通过 `loading.tsx` 文件自动处理加载状态。在数据加载时会显示 loading 组件：
必须就是 `loading.tsx` 文件，不能是其他名字，结合异步组件使用，在异步组件中使用 `await` 关键字，Next.js 会自动显示 loading 组件。

```typescript
// src/app/(content)/news/loading.tsx
export default function NewsLoading() {
  return <div><p>Loading...</p></div>
}
```

---
