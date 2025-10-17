<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import DrawerBar from '@/TabBar/MyDrawing/DrawerBar.vue';
import DrawerRecommend from './DrawerRecommend.vue';
import DrawerSettled from './DrawerSettled.vue';
import { computed, ref } from 'vue';
import { initLoginStore } from '@/stores/counter';
import { useRoute } from 'vue-router';
const tabCount = 2;
const localTab = 0;
const DrawerTab = ref<number>(Number(localStorage.getItem('DrawerTab')) || localTab);

const switchTab = (id: number) => {
    DrawerTab.value = id;
    localStorage.setItem('DrawerTab', id.toString());
};
const activeComp = computed(() => {
    if (DrawerTab.value === 0) return DrawerRecommend;
    if (DrawerTab.value === 1) return DrawerSettled;
    return DrawerRecommend;
});
const activeCompName = computed(() => {
    const names = ['DrawerRecommend', 'DrawerSettled'];
    return names[DrawerTab.value];
});
const startX = ref(0);
const startY = ref(0);
const endY = ref(0);
const endX = ref(0);
const isTouching = ref(false);

const handleTouchStart = (e: TouchEvent) => {
    isTouching.value = true;
    startX.value = e.touches[0].clientX;
    startY.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
    if (!isTouching.value) return;
    endX.value = e.touches[0].clientX;
    endY.value = e.touches[0].clientY;
};

const handleTouchEnd = () => {
    if (!isTouching.value) return;

    const diffX = endX.value - startX.value;
    const diffY = endY.value - startY.value;
    const threshold = 50;

    if (Math.abs(diffY) <= threshold) {
        if (diffX > threshold && DrawerTab.value > 0) {
            switchTab(DrawerTab.value - 1);
        }
        if (diffX < -threshold && DrawerTab.value < tabCount - 1) {
            switchTab(DrawerTab.value + 1);
        }
    }
    isTouching.value = false;
};

const route = useRoute();
const page = ref<number>(1);
const pageSize = ref<number>(10);
const userinfo = initLoginStore();
const responseData = ref<{
    id: string;
    name: string;
    appriciation: string;
    state: string;
    image: string[];
    userimage: string;
    havePrice: boolean
}[]>([]);

const mockGoodsData = [
    { id: '2', name: '咪咪鱼刺冻', appriciation: '4.1', state: '空闲', image: ['/02_daring.ico', '/026_daring.ico'], userimage: '/02_daring.ico', havePrice: false },
    { id: '3', name: '测试商品3', appriciation: '4.4', state: '空闲', image: ['/026_daring.ico'], userimage: '/026_daring.ico', havePrice: false },
    { id: '4', name: '测试商品4', appriciation: '5.0', state: '空闲', image: ['/027_daring.ico'], userimage: '/027_daring.ico', havePrice: false },
    { id: '5', name: '测试商品5', appriciation: '5.0', state: '空闲', image: ['/028_daring.ico'], userimage: '/028_daring.ico', havePrice: false },
    { id: '6', name: '测试商品6', appriciation: '4.5', state: '空闲', image: ['/028_daring.ico'], userimage: '/028_daring.ico', havePrice: false },
    { id: '7', name: '测试商品7', appriciation: '3.8', state: '空闲', image: ['/028_daring.ico'], userimage: '/028_daring.ico', havePrice: false },
    { id: '8', name: '测试商品8', appriciation: '3.6', state: '空闲', image: ['/028_daring.ico'], userimage: '/028_daring.ico', havePrice: false },
    { id: '9', name: '测试商品9', appriciation: '5.0', state: '空闲', image: ['/028_daring.ico'], userimage: '/028_daring.ico', havePrice: false },
];

</script>

<template>
    <div class="main-div">
        <div class="fixed-sub-header">
            <div class="window-tab-bar">
                <DrawerBar :current-tab="DrawerTab" @switch-tab="switchTab" />
            </div>
            <div class="cards-grid" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
                @touchend="handleTouchEnd">
                <KeepAlive :include="['DrawerRecommend', 'DrawerSettled']">
                    <component :is="activeComp" :key="activeCompName" />
                </KeepAlive>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-div {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    .fixed-sub-header {
        position: fixed;
        top: 100px;
        width: 100%;
        background-color: rgb(246, 244, 244);
        z-index: 40;

        .window-tab-bar {
            border-bottom: 1px solid #c8c8c8;
            padding: 8px 0;
            background-color: #ffffff;
        }

        .cards-grid {
            display: flex;
            justify-content: center;
            flex-flow: column;

        }
    }
}
</style>