<script setup lang="ts">
import WindowBar from '@/TabBar/MyInfoHome/WindowBar.vue';
import WindowRecommend from '@/components/MyInfoHome/Window/WindowRecommend.vue';
import WindowRecent from '@/components/MyInfoHome/Window/WindowRecent.vue';
import WindowFollow from '@/components/MyInfoHome/Window/WindowFollow.vue';
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';


const tabCount = 3;
const localTab = 0;
const homeSonTab = ref<number>(Number(localStorage.getItem('homeSonTab')) || localTab);

const fixedHeaderRef = ref<HTMLElement | null>(null);
const contentAreaRef = ref<HTMLElement | null>(null);

const updateContentMargin = () => {
    if (fixedHeaderRef.value && contentAreaRef.value) {
        const headerHeight = fixedHeaderRef.value.offsetHeight;
        contentAreaRef.value.style.marginTop = `${headerHeight}px`;
    }
};

watch(homeSonTab, updateContentMargin);

const startX = ref(0);
const startY = ref(0);
const endY = ref(0);
const endX = ref(0);
const isTouching = ref(false);

const switchTab = (id: number) => {
    homeSonTab.value = id;
    localStorage.setItem('homeSonTab', id.toString());
};

const activeComp = computed(() => {
    if (homeSonTab.value === 0) return WindowRecommend;
    if (homeSonTab.value === 1) return WindowRecent;
    if (homeSonTab.value === 2) return WindowFollow;
    return WindowRecommend;
});
const activeCompName = computed(() => {
    const names = ['WindowRecommend', 'WindowRecent', 'WindowFollow'];
    return names[homeSonTab.value];
});
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
        if (diffX > threshold && homeSonTab.value > 0) {
            switchTab(homeSonTab.value - 1);
        }
        if (diffX < -threshold && homeSonTab.value < tabCount - 1) {
            switchTab(homeSonTab.value + 1);
        }
    }
    isTouching.value = false;
};

const quickDelivery = async () => {
    // 24h特快功能实现
}; onMounted(() => {
    updateContentMargin();
    window.addEventListener('resize', updateContentMargin);
});


onUnmounted(() => {
    window.removeEventListener('resize', updateContentMargin);
});
</script>

<template>
    <div class="Layout">
        <div class="fixed-sub-header" ref="fixedHeaderRef">
            <div class="window-tab-bar">
                <WindowBar :current-tab="homeSonTab" @switch-tab="switchTab" />
            </div>
            <div class="sort-wrap">
                <button class="sort-button quick-delivery" @click="quickDelivery">
                    <img src="/favicon.ico" class="button-img" alt="24h特快图标" />
                    <span class="button-text">24h特快</span>
                </button>
                <button class="sort-button sort-content" @click="quickDelivery">
                    <span class="button-text">分类题材</span>
                </button>
                <button class="sort-button another-sort-content" @click="quickDelivery">
                    <span class="button-text">价格/时间</span>
                </button>
            </div>
        </div>
        <div class="content-area" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
            ref="contentAreaRef">
            <KeepAlive :include="['WindowRecommend', 'WindowRecent', 'WindowFollow']">
                <component :is="activeComp" :key="activeCompName" />
            </KeepAlive>
        </div>
    </div>
</template>

<style scoped>
.Layout {
    width: 100%;
    overflow: hidden;

    .fixed-sub-header {
        position: fixed;
        top: 100px;
        width: 100%;
        background-color: #ffffff;
        z-index: 49;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        .window-tab-bar {
            border-bottom: 1px solid #c8c8c8;
            padding: 10px 0;
        }
    }

    .sort-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;

        .sort-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(2px, 0.8vw, 6px);
            padding: clamp(6px, 1.5vw, 10px) clamp(10px, 2vw, 14px);
            border: none;
            border-radius: 8px;
            background: hsla(210, 90%, 67%, 0.152);
            min-width: 85px;
            white-space: nowrap;
            transition: all 0.2s ease;

            .button-text {
                font-size: clamp(9px, 2.2vw, 14px);
                color: #333;
                font-weight: 500;
                letter-spacing: 0.2px;
            }


            .button-img {
                width: clamp(14px, 3vw, 18px);
                height: clamp(14px, 3vw, 18px);
                object-fit: contain;
            }
        }
    }

    .content-area {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
}
</style>
