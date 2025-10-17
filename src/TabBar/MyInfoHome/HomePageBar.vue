<script setup lang="ts">
import { ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    currentTab: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['switchTab']);
const switchTab = (id: number) => {
    emit('switchTab', id);
};
const tabBarList = ref([
    { id: 0, text: '橱窗', icon: 'window', activeIcon: 'window-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 20 },
    { id: 1, text: '企划', icon: 'plan', activeIcon: 'plan-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 20 },
]);
</script>

<template>
    <div class="tabBar" data-v-inspector="src/TabBar/MyInfoHome/HomePageBar.vue:24:5">
        <div v-for="item in tabBarList" :key="item.id" class="tab-item" :class="{ 'active': currentTab === item.id }"
            @click="switchTab(item.id)" data-v-inspector="src/TabBar/MyInfoHome/HomePageBar.vue:25:9">
            <img :type="currentTab === item.id ? item.activeIcon : item.icon" :size="item.size"
                :color="currentTab === item.id ? item.activeColor : item.color"
                data-v-inspector="src/TabBar/MyInfoHome/HomePageBar.vue:27:13" />
            <div class="tab-text" data-v-inspector="src/TabBar/MyInfoHome/HomePageBar.vue:29:13">{{ item.text }}</div>
        </div>
        <button class="add-content" data-v-inspector="src/TabBar/MyInfoHome/HomePageBar.vue:31:9">+</button>
    </div>
</template>

<style scoped>
.tabBar {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: rgb(255, 255, 255);
    position: relative;
    z-index: 100;
    overflow: hidden;
    align-items: center;
    border-top-left-radius: 15%;
    border-top-right-radius: 15%;

    .add-content {
        width: 32px;
        height: 32px;
        margin-left: auto;
        border-radius: 50%;
        color: #ffffff;
        background: #7aabf0;
        opacity: 0.9;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .tab-item {
        margin: 0 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        position: relative;
        z-index: 100;
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
        font-size: 24px;
        margin-top: 4px;
        color: #8a8a8ab2;

        .tab-item.active & {
            color: #282828;
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
