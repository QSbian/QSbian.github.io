import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface UserInfo {
  id: string
  name: string
  token: string
  falsetime:number
}

export const initLoginStore = defineStore('auth', () => {
  const userinfo = ref<UserInfo |null>(null);

  const isLoginIn = computed(() => !!userinfo.value?.token);
  const needRelogin = computed(() => userinfo.value?.falsetime && userinfo.value?.falsetime < Date.now())


  const login = (newUserinfo: UserInfo) => {
    userinfo.value = newUserinfo
  }
  const updateToken = (newToken: string) =>{
    if(userinfo.value){
      userinfo.value.token = newToken;
    }
  }
  const logout = () => {
    userinfo.value = null
  }
  
  // 暴露出去供组件使用
  return {
    userinfo,

    isLoginIn,
    needRelogin,
    
    login,
    logout,
    updateToken,
  }
});
