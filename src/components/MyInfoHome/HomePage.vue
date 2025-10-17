<script setup lang="ts">
import HomePageWindow from '@/components/MyInfoHome/Window/HomePageWindow.vue'
import HomePagePlan from '@/components/MyInfoHome/Plan/HomePagePlan.vue';
import HomePageBar from '@/TabBar/MyInfoHome/HomePageBar.vue';
import { computed, ref } from 'vue';
import router from '@/router';
defineOptions({
    name: "HomePage"
})
const localTab = 0;
const homeTab = ref<number>(Number(localStorage.getItem('homeTab')) || localTab);

const activeComp = computed(() => {
    if (homeTab.value === 0) return HomePageWindow;
    if (homeTab.value === 1) return HomePagePlan;
    return HomePageWindow;
});
const switchTab = (id: number) => {
    homeTab.value = id;
    localStorage.setItem('homeTab', id.toString());
};

const pushActivity = () => {
    router.push({ name: 'Search' })
}
</script>

<template>
    <div class="Layout">
        <div class="fixed-header">
            <div class="tab-bar-area">
                <HomePageBar :current-tab="homeTab" @switch-tab="switchTab" />
            </div>
            <div class="search-wrap">
                <input class="input-wrapper" type="text" placeholder="搜索" @focus="pushActivity">
            </div>
        </div>
        <div class="content-area">
            <KeepAlive>
                <component :is="activeComp" />
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped>
.Layout {
    width: 100%;
    /* min-height: 100vh; */
    overflow: hidden;
    background: linear-gradient(#ffffff 0%, rgba(204, 22, 22, 0) 0) 0 0, 55px 0 rgb(246, 244, 244);
    background-size: 140px 200px;
    background-repeat: repeat-x;

    .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        z-index: 50;

        .tab-bar-area {
            padding: 10px 4px;
        }

        .search-wrap {
            margin-top: 0px;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(170, 117, 117, 0.05);
        }
    }

    .content-area {
        margin-top: 100px;
        width: 100%;
        min-height: calc(100vh);
        margin-bottom: 40px;
    }
}


.input-wrapper {
    padding: 10px 20px;
    width: 90%;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 15px;
    background-color: rgba(174, 172, 172, 0.137);
}

.input-wrapper:focus::placeholder {
    opacity: 0;
    transition: opacity 0.1s ease;
}
</style>