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

const windowTabBarList = ref([
    { id: 0, text: '推荐', icon: 'recommend', activeIcon: 'recommend-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 20 },
    { id: 1, text: '新上', icon: 'recent', activeIcon: 'recent-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 20 },
    { id: 2, text: '关注', icon: 'follow', activeIcon: 'trait-filled', color: '#8a8a8a', activeColor: '#3e7bfa', size: 20 },
]);

</script>

<template>
    <div class="tabBar" data-v-inspector="src/TabBar/MyInfoHome/WindowBar.vue:26:5">
        <div v-for="item in windowTabBarList" :key="item.id" class="tab-item"
            :class="{ 'active': currentTab === item.id }" @click="switchTab(item.id)"
            data-v-inspector="src/TabBar/MyInfoHome/WindowBar.vue:27:9">
            <img :type="currentTab === item.id ? item.activeIcon : item.icon" :size="item.size"
                :color="currentTab === item.id ? item.activeColor : item.color"
                data-v-inspector="src/TabBar/MyInfoHome/WindowBar.vue:29:13" />
            <div class="tab-text" data-v-inspector="src/TabBar/MyInfoHome/WindowBar.vue:31:13">{{ item.text }}</div>
        </div>
    </div>
</template>

<style scoped>
.tabBar {
    display: flex;
    width: 100%;
    height: 30px;
    background-color: rgb(255, 255, 255);
    position: relative;
    z-index: 100;
    overflow: hidden;
    align-items: center;
    padding: 16px 0;

    .add-content {
        margin-left: auto;
        font-size: 24px;
        padding: 0 10px
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
        font-size: 20px;
        margin-top: 4px;
        color: #8a8a8ab2;

        .tab-item.active & {
            color: #4c8eeb;
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
