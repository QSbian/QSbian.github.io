<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { initLoginStore } from '@/stores/counter';
import request from '@/utils/request';
import { onMounted, ref, onBeforeUnmount, nextTick, onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import LoadingAnimation from '@/Animation/LoadingAnimation.vue';
import DrawerCard from '@/ComponentCard/MyDrawing/DrawerCard.vue';
defineOptions({
    name: 'DrawerSettled'
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
                :to="{ path: '/recommend/content', query: { id: item.id, name: item.name } }">
                <DrawerCard :contact="item" />
            </router-link>
            <div>
                <div v-if="!hasMoreData && responseData.length > 0" class="no-more-data">
                    <span class="loading-text">没有更多数据了</span>
                </div>
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
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    position: relative;


    .cards-grid {
        display: grid;
        height: 100%;
        max-height: calc(100vh - 180px);
        width: 100%;
        padding: 4px;
        box-sizing: border-box;
        position: relative;
        min-height: calc(100vh - 200px);
        overflow-y: auto;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 48vw, 240px), 1fr));
        gap: clamp(8px, 1.5vw, 20px);
        max-width: 1400px;
        margin: 0 auto;

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
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #666;
            font-size: 14px;
            position: static;
        }
    }

    .refresh-indicator {
        position: fixed;
        left: 0;
        top: 70px;
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
        color: #666;
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
