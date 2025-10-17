<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
    currentTab: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['switchTab']);

const tabBarList = ref([
    { id: 0, text: '首页', icon: 'home', activeIcon: 'home-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 32 },
    { id: 1, text: '画师', icon: 'drawing', activeIcon: 'drawing-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 32 },
    { id: 2, text: '商铺', icon: 'shop', activeIcon: 'shop-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 32 },
    { id: 3, text: '消息', icon: 'chat', activeIcon: 'chat-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 32 },
    { id: 4, text: '我的', icon: 'auth', activeIcon: 'auth-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 32 },
]);

// 计算激活项的偏移量
const activeOffset = computed(() => {
    return (100 / tabBarList.value.length);
});

const switchTab = (id: number) => {
    emit('switchTab', id);
};
</script>

<template>
    <div class="tabBar" data-v-inspector="src/TabBar/TabBar.vue:32:2">
        <div class="active-indicator" :style="{ transform: `translateX(${props.currentTab * activeOffset + '%'})` }"
            data-v-inspector="src/TabBar/TabBar.vue:33:3">
        </div>
        <div v-for="item in tabBarList" :key="item.id" class="tab-item" :class="{ 'active': currentTab === item.id }"
            @click="switchTab(item.id)" data-v-inspector="src/TabBar/TabBar.vue:35:3">
            <!-- <img :type="currentTab === item.id ? item.activeIcon : item.icon" :size="item.size"
                :color="currentTab === item.id ? item.activeColor : item.color"
                data-v-inspector="src/TabBar/TabBar.vue:37:4" /> -->
            <div class="tab-text" data-v-inspector="src/TabBar/TabBar.vue:39:4">{{ item.text }}</div>
        </div>
    </div>
</template>

<style scoped>
.tabBar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(239, 239, 239, 0.1);
    position: fixed;
    bottom: var(--window-bottom, 0);
    z-index: 100;
    overflow: hidden;
    left: 0;
    border-top: 1px solid #ebebeb;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: v-bind(activeOffset + '%');
        background-color: #e0e9ff;
        transition: transform 0.3s cubic-bezier(0.8, -0.4, 0, 1.4);
        z-index: 0;
        transform: translateX(calc(v-bind(currentTab) * 100%));
    }

    .tab-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;

        &:active {
            transform: scale(0.95);
        }

        &.active {
            transform: scale(1.1);

            .uni-icons {
                animation: bounce 0.6s cubic-bezier(0.8, -0.4, 0, 1.4);
            }
        }
    }

    .tab-text {
        font-size: 10px;
        margin-top: 4px;
        color: #8a8a8a;

        .tab-item.active & {
            color: #3e7bfa;
        }
    }
}


@keyframes bounce {
    0% {
        transform: translateY(0px) scale(1);
    }

    40% {
        transform: translateY(-8px) scale(1.1);
    }

    60% {
        transform: translateY(0px) scale(1);
    }

    80% {
        transform: translateY(-4px) scale(1.05);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}
</style>
