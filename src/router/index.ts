import { createRouter, createWebHistory, RouterLink, type RouteRecordRaw } from 'vue-router'
import { PATH, ROUTE_NAME } from './path';
import { initLoginStore } from '@/stores/counter';

import myindex from "@/components/MyIndex/PageIndex.vue";
import myrecommendcontent from "@/components/MyInfoHome/Window/RecommendContent.vue"
import myplancontent from "@/components/MyInfoHome/Plan/PlanContent.vue"

import mysearch from "@/components/MyInfoHome/Search/HomePageSearch.vue";
import mysearchto from "@/components/MyInfoHome/Search/SearchContent.vue";

import mydrawer from "@/components/MyDrawing/Drawer/DrawerContent.vue";

import mycontentmessage from "@/components/MyInfoHome/Search/ContentMessage.vue"
import mymessageto from "@/components/MyMessage/MessageContent.vue";

import notfound from "@/components/SomeThingWasWrong/NotFound.vue";

import login from "@/components/MyLoginIn/LoginIn.vue";
import resetcode from "@/components/MyLoginIn/ResetPassword.vue";

const routers : RouteRecordRaw[]= [
  {
    path:PATH.INDEX,
    name:ROUTE_NAME.INDEX,
    component:myindex,
    meta:{requireLogin:false},
  },
  {
    path:PATH.LOGIN,
    name:ROUTE_NAME.LOGIN,
    component:login,
    meta:{requireLogin:false}
  },
  {
    path:PATH.RESETPASSWORD,
    name:ROUTE_NAME.RESETPASSWORD,
    component:resetcode,
    meta:{requireLogin:false}
  },
  {
    path:PATH.RECOMMENDCONTENT,
    name:ROUTE_NAME.RECOMMENDCONTENT,
    component:myrecommendcontent,
    meta:{requireLogin:false}
  },
    {
    path:PATH.PLANCONTENT,
    name:ROUTE_NAME.PALNCONTENT,
    component:myplancontent,
    meta:{requireLogin:false}
  },
  {
    path:PATH.SEARCH,
    name:ROUTE_NAME.SEARCH,
    component:mysearch,
    meta:{requireLogin:true},
  },
  {
    path:PATH.SEARCHTO,
    name:ROUTE_NAME.SEARCHTO,
    component:mysearchto,
    meta:{requireLogin:true},
  },
  {
    path:PATH.CONTENTMESSAGE,
    name:ROUTE_NAME.CONTENTMESSAGE,
    component:mycontentmessage,
    props:true,
    meta:{requireLogin:true},
  },
  {
    path:PATH.DrawingMan,
    name:ROUTE_NAME.DrawingMan,
    component:mydrawer,
    meta:{requireLogin:true}
  },
  {
    path: PATH.MESSAGETO,
    name:ROUTE_NAME.MESSAGETO,
    component:mymessageto,
    props:true,
    meta:{requireLogin:true},
  },
  {
    path: PATH.NOTFOUND,
    name:ROUTE_NAME.NOTFOUND,
    component:notfound,
    meta:{requireLogin:false},
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: PATH.NOTFOUND
  // }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers
})

router.beforeEach((to,from,next)=>{
  const authStore = initLoginStore();
  if(to.meta.requireLogin && !authStore.isLoginIn || authStore.needRelogin){
    next({path:PATH.LOGIN, replace:true});
  }
  else{
    next();
  }
})

export default router
