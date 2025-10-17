import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './global.css'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
const app = createApp(App)
app.use(VueLazyload, {
  preLoad: 1.3, // 预加载比例
  error: '/default-error.png', // 图片加载失败时的占位图
  loading: '/default-loading.gif', // 图片加载中的占位图
  attempt: 1 // 加载失败重试次数
})
app.use(createPinia())
// app.use(router);
const updateAppStatus = (status: 'active' | 'closed') => {
  localStorage.setItem('app_last_active_status', status);
};

// 2. 监听“页面可见性变化”（覆盖：切标签、最小化、后台切换）
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    updateAppStatus('active');
  } else {
    updateAppStatus('closed');
  }
});

// 3. 监听“页面即将关闭”（覆盖：直接关闭标签页/浏览器）
window.addEventListener('beforeunload', () => {
  updateAppStatus('closed');
});

// 4. 页面初始加载，默认标记为活跃
updateAppStatus('active');
app.mount('#app')
