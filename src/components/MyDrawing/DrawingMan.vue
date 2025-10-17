<script setup lang="ts">
import DrawingBar from '@/TabBar/MyDrawing/DrawingBar.vue';
import DrawingDrawer from "@/components/MyDrawing/Drawer/DrawingDrawer.vue"
import DrawingGoods from '@/components/MyDrawing/Goods/DrawingGoods.vue'
import DrawingRank from '@/components/MyDrawing/Rank/DrawingRank.vue';
import { computed, ref } from 'vue';
import router from '@/router';
defineOptions({
    name: "DrawingMan"
})
const localTab = 0;
const DrawTab = ref<number>(Number(localStorage.getItem('DrawTab')) || localTab);

const activeComp = computed(() => {
    if (DrawTab.value === 0) return DrawingDrawer;
    if (DrawTab.value === 1) return DrawingGoods;
    if (DrawTab.value === 2) return DrawingRank;
    return DrawingDrawer;
});
const switchTab = (id: number) => {
    DrawTab.value = id;
    localStorage.setItem('DrawTab', id.toString());
};


const pushActivity = () => {
    router.push({ name: 'Search' })
}
</script>

<template>
    <div class="Layout">
        <div class="fixed-header">
            <div class="tab-bar-area">
                <DrawingBar :current-tab="DrawTab" @switch-tab="switchTab" />
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
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(#f9ffff 0%, rgba(255, 246, 246, 0) 0) 0 0, 55px 0 rgb(255, 255, 255);
    background-size: 120px 150px;
    background-repeat: repeat-x;

    .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        z-index: 50;

        .tab-bar-area {
            z-index: 50;
            padding: 10px 4px;
        }

        .search-wrap {
            display: flex;
            justify-content: center;
        }
    }

    .content-area {
        margin-top: 120px;
        width: 100%;
        min-height: calc(100vh - 120px);
        overflow-y: auto;
        padding-bottom: 180px;

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