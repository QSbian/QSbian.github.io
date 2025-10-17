<script setup lang="ts">
import { ref, computed } from 'vue';
import HomePage from '@/components/MyInfoHome/HomePage.vue';
import DrawingMan from '@/components/MyDrawing/DrawingMan.vue';
import CommodityStore from '../MyStore/CommodityStore.vue';
import MessageIn from '@/components/MyMessage/MyMessage.vue';
import PersonalCenter from '@/components/MyPersonalCenter/PersonalCenter.vue';
import TabBar from '@/TabBar/TabBar.vue';


const currentTab = ref<number>(Number(localStorage.getItem('currentTab')) || 0);
const switchTab = (id: number) => {
    currentTab.value = id;
    localStorage.setItem('currentTab', id.toString());
};

const activeComp = computed(() => {
    if (currentTab.value == 0) return HomePage;
    if (currentTab.value == 1) return DrawingMan;
    if (currentTab.value == 2) return CommodityStore;
    if (currentTab.value == 3) return MessageIn;
    if (currentTab.value == 4) return PersonalCenter;
    return HomePage;
});
const activeCompName = computed(() => {
    const names = ['HomePage', 'DrawingMan', 'CommodityStore', 'MyMessage', 'PersonalCenter'];
    return names[currentTab.value];
});
</script>

<template>
    <div class="Layout">
        <div class="main-tab">
            <KeepAlive :include="['HomePage', 'DrawingMan', 'CommodityStore', 'MyMessage', 'PersonalCenter']">
                <component :is="activeComp" :key="activeCompName" />
            </KeepAlive>
            <TabBar :current-tab="currentTab" @switch-tab="switchTab" />
        </div>
    </div>
</template>

<style scoped>
.Layout {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(#feffff 0%, rgba(204, 22, 22, 0) 0) 0 0, 55px 0 rgb(255, 255, 255);
    background-size: 120px 150px;
    background-repeat: repeat-x;

    .main-tab {
        width: 100%;
        height: 100%;
        position: relative;
    }
}
</style>