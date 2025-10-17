<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { initLoginStore } from '@/stores/counter';
import request from '@/utils/request';
import { onMounted, ref, onBeforeUnmount, nextTick, onActivated, onDeactivated } from 'vue';
import PlanCard from '@/ComponentCard/MyInfoHome/PlanCard.vue';
import { useRoute } from 'vue-router';
import LoadingAnimation from '@/Animation/LoadingAnimation.vue';

defineOptions({
    name: 'WindowRecommend'
});

const cardsGridRef = ref<HTMLElement | null>(null);

// 状态定义
const startTouchY = ref(0);
const isTouchingTop = ref(false);
const isTouchingBottom = ref(false);
const pullDistanceTop = ref(0);
const pullDistanceBottom = ref(0);

const isRefreshingUp = ref(false);
const isRefreshingDown = ref(false);

const isAtTop = ref(true);
const isAtBottom = ref(false);

const showRefreshIndicator = ref(false);
const showLoadMoreIndicator = ref(false);

const hasMoreData = ref(true);
const savedScrollTop = ref(0);
const isFirstMount = ref(true);
const finished = ref(false);

const PULL_THRESHOLD = 60;
const MAX_PULL_DISTANCE = 100;

const route = useRoute();
const page = ref<number>(1);
const pageSize = ref<number>(10);
const userinfo = initLoginStore();
const responseData = ref<{
    id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    label: string;
    deadline: string;
    image: string;
    isimage: boolean;
}[]>([]);

const mockGoodsData = [
    {
        id: '1',
        name: '秋兽狴犴',
        title: '长期企划,欢迎感兴趣的小伙伴',
        description: '立绘练习【十月排单】大大',
        label: '初次发布',
        price: '99.00',
        deadline: '2025-10-01',
        image: '/TT (5).jpg',
        isimage: true,
    },
    {
        id: '2',
        name: '可爱小馒头',
        title: '可爱卡通手绘风格游戏',
        description: 'oc变成邪恶人外了？dawdadwdadwadwd',
        label: '初次发布',
        price: '199.00',
        deadline: '2025-10-01',
        image: '/02_daring.ico', isimage: true,
    },
    {
        id: '3',
        name: '我不想画画啊啊啊',
        title: '测试商品3',
        description: '这是测试商品3',
        label: '企业认证',
        price: '299.00',
        deadline: '2025-10-01',
        image: '/026_daring.ico', isimage: true,
    },
    {
        id: '4',
        name: '秋笔',
        title: '测试商品4',
        description: '这是测试商品4',
        label: '企业认证',
        price: '399.00',
        deadline: '2025-10-01',
        image: '/027_daring.ico', isimage: true,

    },
    {
        id: '5',
        name: '何以笙轩墨',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '秋兽',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '/TT (5).jpg', isimage: true,
    }, {
        id: '5',
        name: '狴犴是我哒',
        title: '测试商品5',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    }, {
        id: '15',
        name: '狴犴是我哒',
        title: '测试商品15',
        description: '这是一个较长的测试商品描述内容，用于验证文本截断效果',
        label: '初次发布',
        price: '499.00',
        deadline: '2025-10-01',
        image: '028_daring.ico', isimage: false,
    },
]

const handleScroll = () => {
    if (!cardsGridRef.value) return;
    const scrollTop = cardsGridRef.value.scrollTop;
    const scrollHeight = cardsGridRef.value.scrollHeight;
    const clientHeight = cardsGridRef.value.clientHeight;

    // 顶部状态判断
    isAtTop.value = scrollHeight > clientHeight && scrollTop <= 5;

    // 底部状态判断
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const prevIsAtBottom = isAtBottom.value;
    isAtBottom.value = scrollHeight > clientHeight && distanceToBottom <= 10;

    // 离开底部时重置状态
    if (prevIsAtBottom && !isAtBottom.value) {
        isTouchingBottom.value = false;
        pullDistanceBottom.value = 0;
        showLoadMoreIndicator.value = false;
        isRefreshingDown.value = false;
    }

    if (!hasMoreData.value && isAtBottom.value) {
        isAtBottom.value = false;
    }
    localStorage.setItem('SCROLL_RECOMMEND_POS_KEY', scrollTop.toString());
};


const handleTouchStart = (e: TouchEvent) => {
    // 强制重置
    if (isRefreshingUp.value || isRefreshingDown.value) return;

    if (isAtTop.value && !isTouchingBottom.value) {
        isTouchingTop.value = true;
        startTouchY.value = e.touches[0].clientY;
        pullDistanceTop.value = 0;
        showRefreshIndicator.value = false;
    } else if (isAtBottom.value && !isTouchingTop.value) {
        isTouchingBottom.value = true;
        startTouchY.value = e.touches[0].clientY;
        pullDistanceBottom.value = 0;
        showLoadMoreIndicator.value = false;
    }
};

const handleTouchMove = (e: TouchEvent) => {
    if (isRefreshingUp.value || isRefreshingDown.value) {
        return;
    }

    if (isTouchingTop.value) {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startTouchY.value;
        if (diff > 0) {
            showRefreshIndicator.value = diff > 10;
            pullDistanceTop.value = diff < PULL_THRESHOLD
                ? diff
                : PULL_THRESHOLD + (diff - PULL_THRESHOLD) * 0.3;
            pullDistanceTop.value = Math.min(pullDistanceTop.value, MAX_PULL_DISTANCE);
        }
        return;
    }

    if (isTouchingBottom.value && isAtBottom.value) {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startTouchY.value;
        if (diff > 0) {
            showLoadMoreIndicator.value = diff > 10;
            pullDistanceBottom.value = diff < PULL_THRESHOLD
                ? diff
                : PULL_THRESHOLD + (diff - PULL_THRESHOLD) * 0.3;
            pullDistanceBottom.value = Math.min(pullDistanceBottom.value, MAX_PULL_DISTANCE);
        }
        return;
    }
};

// 触摸结束后确保状态完全重置
const handleTouchEnd = () => {
    if (isTouchingTop.value) {
        if (pullDistanceTop.value >= PULL_THRESHOLD) {
            isRefreshingUp.value = true;
            refreshData();
        } else {
            showRefreshIndicator.value = false;
            pullDistanceTop.value = 0;
        }
        isTouchingTop.value = false;
    }

    if (isTouchingBottom.value) {
        if (pullDistanceBottom.value >= PULL_THRESHOLD) {
            isRefreshingDown.value = true;
            loadMoreData();
        } else {
            showLoadMoreIndicator.value = false;
            pullDistanceBottom.value = 0;
        }
        isTouchingBottom.value = false;
    }
};

// 刷新后强制重置触摸状态，确保下次滑动有效
const refreshData = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        responseData.value = [...mockGoodsData];
        page.value = 1;
        hasMoreData.value = true;
        finished.value = false;

        await nextTick();
        if (cardsGridRef.value) {
            cardsGridRef.value.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 强制重置所有状态
        savedScrollTop.value = 0;
        localStorage.setItem('SCROLL_RECOMMEND_POS_KEY', '0');
        isTouchingTop.value = false;
        pullDistanceTop.value = 0;
        console.log("数据刷新完成！");
    } catch (error) {
        console.log("刷新失败：", error);
    } finally {
        setTimeout(() => {
            isRefreshingUp.value = false;
            showRefreshIndicator.value = false;
        }, 300);
    }
};

const loadMoreData = async () => {
    if (isRefreshingDown.value || !hasMoreData.value || !cardsGridRef.value) return;
    try {
        isRefreshingDown.value = true;
        showLoadMoreIndicator.value = true;
        page.value++;
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (page.value > 2) {
            hasMoreData.value = false;
            finished.value = true;
            return;
        }

        const newData = mockGoodsData.slice(0, 4).map(item => ({
            ...item,
            id: `${item.id}_page${page.value}`
        }));

        const prevScrollTop = cardsGridRef.value.scrollTop;
        responseData.value = [...responseData.value, ...newData];
        await nextTick();

        if (cardsGridRef.value) {
            cardsGridRef.value.scrollTop = prevScrollTop;
            savedScrollTop.value = prevScrollTop;
            localStorage.setItem('SCROLL_RECOMMEND_POS_KEY', prevScrollTop.toString());
        }
    } catch (error) {
        page.value--;
        console.log("加载更多失败：", error);
    } finally {
        isRefreshingDown.value = false;
        showLoadMoreIndicator.value = false;
        pullDistanceBottom.value = 0;
    }
};

const handleScrollEnd = () => {
    if (isAtBottom.value && !isRefreshingDown.value && hasMoreData.value) {
        loadMoreData();
    }
};


onActivated(() => {
    if (!cardsGridRef.value) return;

    cardsGridRef.value.addEventListener('scroll', handleScroll);
    cardsGridRef.value.addEventListener('scroll', handleScrollEnd);

    const savedPos = Number(localStorage.getItem('SCROLL_RECOMMEND_POS_KEY')) || 0;

    if (!isFirstMount.value) {
        nextTick(() => {
            if (cardsGridRef.value) {
                cardsGridRef.value.scrollTo({
                    top: savedPos,
                    behavior: 'instant'
                });
            }
        });
    }
});


onDeactivated(() => {
    cardsGridRef.value?.removeEventListener('scroll', handleScroll);
    cardsGridRef.value?.removeEventListener('scroll', handleScrollEnd);
});

onMounted(() => {
    const pageNum = route.query.page ? Number(route.query.page) : 1;
    const size = route.query.page_size ? Number(route.query.page_size) : 10;
    if (!isNaN(pageNum) && pageNum > 0) page.value = pageNum;
    if (!isNaN(size) && size > 0) pageSize.value = size;
    responseData.value = [...mockGoodsData];

    if (page.value > 1) {
        isRefreshingUp.value = true;
        refreshData();
    }

    const savedPos = Number(localStorage.getItem('SCROLL_RECOMMEND_POS_KEY')) || 0;
    savedScrollTop.value = savedPos;
    isFirstMount.value = false;

    if (cardsGridRef.value) {
        cardsGridRef.value.addEventListener('scroll', handleScroll);
        cardsGridRef.value.addEventListener('scroll', handleScrollEnd);

        nextTick(() => {
            setTimeout(() => {
                cardsGridRef.value?.scrollTo({
                    top: savedPos,
                    behavior: 'instant'
                });
            }, 100);
        });
    }
});

onBeforeUnmount(() => {
    if (cardsGridRef.value) {
        cardsGridRef.value.removeEventListener('scroll', handleScroll);
        cardsGridRef.value.removeEventListener('scroll', handleScrollEnd);
    }
});
</script>

<template>
    <div class="main-div">
        <div class="refresh-indicator"
            :class="{ 'show': showRefreshIndicator || isRefreshingUp, 'refreshing': isRefreshingUp }"
            :style="{ transform: showRefreshIndicator || isRefreshingUp ? 'translateY(120%)' : 'translateY(0)' }">
            <div class="refresh-content">
                <LoadingAnimation class="loading-icon" />
            </div>
        </div>

        <div class="cards-grid" @touchstart.passive="handleTouchStart" @touchmove.passive="handleTouchMove"
            @touchend="handleTouchEnd" ref="cardsGridRef">
            <router-link class="card-link" v-for="item in responseData" :key="item.id"
                :to="{ path: '/plan/content', query: { id: item.id, name: item.name } }">
                <PlanCard :contact="item" />
            </router-link>

            <div v-if="!hasMoreData && responseData.length > 0" class="no-more-data">
                <span class="loading-text">没有更多数据了</span>
            </div>
        </div>

        <div v-if="hasMoreData" class="load-more-indicator" :style="{
            transform: (isAtBottom && (showLoadMoreIndicator || isRefreshingDown || pullDistanceBottom > 0))
                ? `translateY(-${pullDistanceBottom > 0 ? pullDistanceBottom : 60}px)`
                : 'translateY(100%)'
        }">
            <div v-if="isRefreshingDown || showLoadMoreIndicator">
                <LoadingAnimation class="loading-icon" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-div {
    padding: 18px 0px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    min-height: calc(100vh - 180px);
    background-color: rgb(246, 244, 244);

    .cards-grid {
        display: grid;
        height: 100%;
        max-height: calc(100vh - 160px);
        overflow-y: auto;
        scroll-behavior: smooth;
        grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 48vw, 240px), 1fr));
        gap: 2vw;
        padding: 4px 10px;
        max-width: 1400px;
        box-sizing: border-box;

        .card-link {
            display: block;
            text-decoration: none;
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .no-more-data {
            grid-column: 1 / -1;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #666;
            font-size: 14px;
        }
    }

    .refresh-indicator {
        position: fixed;
        left: 0;
        top: 40px;
        width: 100%;
        background: transparent;
        z-index: 48;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .refresh-content {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #601c1c;
    }

    .loading-icon {
        width: 60px;
        height: 60px;
    }

    .load-more-indicator {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: transparent;
        z-index: 48;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0, 1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

/* 响应式适配 */
@media (max-width: 430px) {
    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 8px;
        padding: 8px 4px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .cards-grid {
        max-width: 800px;
        margin: 0 auto;
    }
}

@media (min-width: 993px) {
    .cards-grid {
        max-width: 1000px;
        margin: 0 auto;
    }
}
</style>
