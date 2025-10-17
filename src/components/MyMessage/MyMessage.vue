<script setup lang="ts">
import { initLoginStore } from "@/stores/counter";
import MyMessageBar from "@/TabBar/MyMessage/MyMessageBar.vue";
import MessageConversation from "./MessageConversation.vue";
import MessageContact from "./MessageShop.vue";
import { computed, ref } from "vue";

defineOptions({
    name: "MyMessage"
})
const LoginStore = initLoginStore();
const startX = ref(0);
const startY = ref(0);
const endY = ref(0);
const endX = ref(0);
const isTouching = ref(false);


const tabCount = 2;
const localTab = 0;
const messageTab = ref<number>(Number(localStorage.getItem('messageTab')) || localTab);


const activeComp = computed(() => {
    if (messageTab.value === 0) return MessageConversation;
    if (messageTab.value === 1) return MessageContact;
    return MessageConversation;
});


const switchTab = (id: number) => {
    messageTab.value = id;
    localStorage.setItem('messageTab', id.toString());
};


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
    const threshold = 50; // 滑动阈值

    if (Math.abs(diffY) <= threshold) {
        if (diffX > threshold && messageTab.value > 0) {
            switchTab(messageTab.value - 1);
        }
        if (diffX < -threshold && messageTab.value < tabCount - 1) {
            switchTab(messageTab.value + 1);
        }
    }
    isTouching.value = false;
};
</script>

<template>
    <div class="message-box">
        <div class="message-head">
            消息列表
            <button class="setting-button">
                <img src="/设置.png" class="button-img" alt="设置图标" />
            </button>
        </div>

        <div class="button-div">
            <div class="message-item">
                <button class="message-button">
                    <img src="/A1点赞.jpg" class="button-img" alt="新增点赞" />
                </button>
                <div class="button-text">收到点赞</div>
            </div>
            <div class="message-item">
                <button class="message-button">
                    <img src="/A1收藏.jpg" class="button-img" alt="新增收藏" />
                </button>
                <div class="button-text">新增收藏</div>
            </div>
            <div class="message-item">
                <button class="message-button">
                    <img src="/A1关注.jpg" class="button-img" alt="新增关注" />
                </button>
                <div class="button-text">新增关注</div>
            </div>
            <div class="message-item">
                <button class="message-button">
                    <img src="/A1信息.jpg" class="button-img" alt="官方动态图标" />
                </button>
                <div class="button-text">系统信息</div>
            </div>
        </div>


        <MyMessageBar class="message-bar" :current-tab="messageTab" @switch-tab="switchTab"></MyMessageBar>
        <div class="body-to-conversation" v-if="LoginStore.isLoginIn" @touchstart="handleTouchStart"
            @touchmove="handleTouchMove" @touchend="handleTouchEnd">
            <!-- 可滚动内容区 -->
            <div class="content-area">
                <KeepAlive>
                    <component :is="activeComp" />
                </KeepAlive>
            </div>

        </div>
    </div>
</template>

<style scoped>
.message-box {
    width: 100%;
    height: 100vh;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #fff;

    .message-head {
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        color: #000;
        background-color: #fff;
        padding: 10px 0;
        height: 50px;

        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .setting-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #fff;
            border: none;
            cursor: pointer;
        }
    }

    .button-div {
        padding: clamp(8px, 2vw, 15px);
        width: 100%;
        max-width: 1200px;
        background-color: #fff;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        gap: clamp(8px, 3vw, 16px);
        box-sizing: border-box;
        height: 80px;

        .message-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;


            .message-button {
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                border-radius: 50%;
                background-color: #f5f5f5;
                padding: 0;
                margin: 0;
                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    transform: scale(1.05);
                }
            }

            .button-text {
                font-size: clamp(11px, 3vw, 14px);
                color: #333;
                text-align: center;
                margin-top: clamp(4px, 1vw, 8px);
                white-space: nowrap;
            }

        }
    }

    .message-bar {
        border-bottom: 1px solid #000;
        height: 40px;
        box-sizing: border-box;
    }

    .body-to-conversation {
        flex: 1;
        width: 100%;

        .content-area {
            flex: 1;
        }

    }
}


.button-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 375px) {
    .message-head {
        font-size: 20px;
        height: 44px;
    }

    .button-div {
        height: 70px;
    }

    .message-button {
        width: 32px;
        height: 32px;
    }

    .button-text {
        font-size: 10px;
        margin-top: 3px;
    }

    .message-bar {
        height: 36px;
    }

    .body-to-conversation {
        padding-top: calc(var(--safe-top, 0px) + 4px);
    }
}


@media (min-width: 768px) {
    .button-div {
        max-width: 600px;
    }

    .content-area {
        width: 80%;
        margin: 0 auto;
    }
}
</style>