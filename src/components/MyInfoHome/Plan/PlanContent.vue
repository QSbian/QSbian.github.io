<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import LoadingAnimationOne from '@/Animation/LoadingAnimationOne.vue'
interface GoodsData {
    id: string
    name: string
    description: string
    price: string
    is_sold: string
    image: string[]
    userimage: string
}

const goods = ref<GoodsData>({
    id: '',
    name: '',
    description: '',
    price: '',
    is_sold: '',
    image: [],
    userimage: ''
})

const isLoading = ref(false)
const imagesLoaded = ref<Record<number, boolean>>({})
const currentIndex = ref(0);
const currentIndexMax = ref(0);
const showOriginalImage = ref(false);
const currentOriginalImage = ref(''); // 当前要预览的原图地址

const router = useRouter()
const handleBack = () => {
    router.back()
}


const imgStartX = ref(0);
const imgStartY = ref(0);
const imgEndY = ref(0);
const imgEndX = ref(0);
const isImgTouching = ref(false); // 图片切换专用触摸状态
const isImgDragging = ref(false); // 图片切换专用拖动状态


const lastTouchY = ref<number | null>(null);
const isContentDragging = ref(false);
const infoPosition = ref(0);
const maxDragDistance = ref(500); // 最大向上拖动距离（可按需调整）

const route = useRoute()
const getGoodsId = () => {
    return route.query.id as string | undefined
}

const fetchGoodsData = async (id: string) => {
    isLoading.value = true
    try {
        const mockResult = await new Promise<GoodsData>((resolve) => {
            setTimeout(() => {
                const targetGoods = mockGoodsData.find(item => item.id === id)
                resolve(targetGoods || goods.value)
            }, 500)
        })
        goods.value = mockResult
    } catch (error) {
        console.error('获取商品数据失败：', error)
    } finally {
        isLoading.value = false
    }
};

// 预加载图片并缓存
const preloadImage = (url: string, index: number) => {
    return new Promise((resolve) => {
        if (imagesLoaded.value[index]) {
            resolve(true)
            return
        }
        const img = new Image()
        img.src = url
        img.onload = () => {
            imagesLoaded.value[index] = true
            resolve(true)
        }
        img.onerror = () => {
            imagesLoaded.value[index] = true
            resolve(false)
        }
    })
}

// 切换图片
const switchTab = async (id: number) => {
    if (!imagesLoaded.value[id] && goods.value.image[id]) {
        await preloadImage(goods.value.image[id], id)
    }
    if (showOriginalImage.value) {
        currentIndexMax.value = id;
        localStorage.setItem('currentIndex', id.toString());
    }
    else {
        currentIndex.value = id;
        localStorage.setItem('currentIndex', id.toString());
    }

};

// 打开原图预览
const openOriginalImage = (url: string) => {
    currentOriginalImage.value = url;
    showOriginalImage.value = true;
};

// 关闭原图预览
const closeOriginalImage = () => {
    showOriginalImage.value = false;
    currentOriginalImage.value = '';
};

// 监听商品数据变化，预加载图片
watch(() => goods.value.image, (newImages) => {
    if (newImages.length > 0) {
        preloadImage(newImages[0], 0)
        if (newImages.length > 1) {
            preloadImage(newImages[1], 1)
        }
    }
})

const imgTouchStart = (e: TouchEvent) => {
    isImgTouching.value = true;
    imgStartX.value = e.touches[0].clientX;
    imgStartY.value = e.touches[0].clientY;
    isImgDragging.value = true;
};

const imgTouchMove = (e: TouchEvent) => {
    if (!isImgDragging.value) return;
    imgEndX.value = e.touches[0].clientX;
    imgEndY.value = e.touches[0].clientY;
};

const imgTouchEnd = () => {
    if (!isImgTouching.value) return;

    const diffX = imgEndX.value - imgStartX.value;
    const diffY = imgEndY.value - imgStartY.value;
    const threshold = 50;

    if (Math.abs(diffY) < Math.abs(diffX) && Math.abs(diffX) > threshold) {
        if (showOriginalImage.value) {
            if (diffX > 0 && currentIndexMax.value > 0) {
                switchTab(currentIndexMax.value - 1);
            } else if (diffX < 0 && currentIndexMax.value < goods.value.image.length - 1) {
                switchTab(currentIndexMax.value + 1);
            }
        }
        else {
            if (diffX > 0 && currentIndex.value > 0) {
                switchTab(currentIndex.value - 1);
            } else if (diffX < 0 && currentIndex.value < goods.value.image.length - 1) {
                switchTab(currentIndex.value + 1);
            }
        }
    }
    isImgTouching.value = false;
    isImgDragging.value = false;
};

const contentTouchStart = (e: TouchEvent) => {
    lastTouchY.value = e.touches[0].clientY;
    isContentDragging.value = true;
};

const contentTouchMove = (e: TouchEvent) => {
    if (!isContentDragging.value || lastTouchY.value === null) return;

    const currentTouchY = e.touches[0].clientY;

    const deltaY = currentTouchY - lastTouchY.value;
    infoPosition.value = Math.max(0, Math.min(infoPosition.value - deltaY, maxDragDistance.value));
    lastTouchY.value = currentTouchY;
};

const contentTouchEnd = () => {
    // 触摸结束：重置状态，避免残留
    isContentDragging.value = false;
    lastTouchY.value = null;
};

// 触摸意外中断（如弹出弹窗），也重置状态
const contentTouchCancel = () => {
    isContentDragging.value = false;
    lastTouchY.value = null;
};

onMounted(() => {
    const goodsId = getGoodsId()
    if (goodsId) {
        fetchGoodsData(goodsId)
    }
})

const mockGoodsData = [
    {
        id: '1',
        name: '平冷千叶',
        description: '立绘练习【十月排单】大大',
        price: '99.00',
        is_sold: '1',
        image: ['/TT (8).jpg'],
        userimage: '/025_daring.ico'
    },
    {
        id: '2',
        name: 'QSbian',
        description: 'oc变成邪恶人外了？dawdadwdadwadwd',
        price: '199.00',
        is_sold: '2',
        image: ['/02_daring.ico'],
        userimage: '/02_daring.ico'
    },
    {
        id: '3',
        name: '测试商品3',
        description: '这是测试商品3（可加长描述测试拖动：1234567890abcdefghijklmnopqrstuvwxyz，测试跟手拖动是否流畅，是否支持一直摁住滑动）',
        price: '299.00',
        is_sold: '3',
        image: ['/026_daring.ico', '/02_daring.ico'],
        userimage: '/026_daring.ico'
    }
];
</script>

<template>
    <button class="return-button" @click="handleBack">&lt;</button>
    <div class="message-detail">
        <div v-if="isLoading" class="loading-state">
            <LoadingAnimationOne class="loading-spinner"></LoadingAnimationOne>
            <div class="loading-spinner">加载中...</div>
        </div>
        <div v-else class="content-container" :style="{ transform: `translateY(-${infoPosition}px)` }"
            @touchstart="contentTouchStart" @touchmove="contentTouchMove" @touchend="contentTouchEnd"
            @touchcancel="contentTouchCancel">
            <div class="image-container" @touchstart="imgTouchStart" @touchmove="imgTouchMove" @touchend="imgTouchEnd">
                <div class="image-wrapper">
                    <img class="main-img" v-for="(img, idx) in goods.image" :key="idx" :src="img"
                        :alt="`商品图 ${idx + 1}`" :class="{ active: idx === currentIndex }" v-show="idx === currentIndex"
                        @click="openOriginalImage(img)" />
                </div>

                <div v-if="goods.image.length > 1" class="image-indicators">
                    <span v-for="(img, idx) in goods.image" :key="idx" @click="switchTab(idx)"
                        :class="{ active: idx === currentIndex }"></span>
                </div>
            </div>

            <div class="info-container">
                <div class="user-info">
                    <img class="user-img" :src="goods.userimage" alt="头像" />
                    <div> {{ goods.name }}</div>
                </div>
                <div class="content-info">
                    <div class="content-description">{{ goods.description }}</div>
                    <div class="content-price">¥{{ goods.price }}</div>
                    <div class="content-sold">销售状态: {{ goods.is_sold === '1' ? '已售出' : goods.is_sold === '2' ? '在售' :
                        '未知' }}</div>
                </div>
            </div>
        </div>
        <div class="original-image-modal" v-if="showOriginalImage" @click="closeOriginalImage">
            <div class="modal-content" @click.stop @touchstart="imgTouchStart" @touchmove="imgTouchMove"
                @touchend="imgTouchEnd">
                <img class="original-img" v-for="(img, idx) in goods.image" :key="idx" :src="img"
                    :alt="`商品图 ${idx + 1}`" :class="{ active: idx === currentIndexMax }"
                    v-show="idx === currentIndexMax" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.return-button {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #000000;
    font-size: 20px;
    color: #000000;
    cursor: pointer;
    z-index: 100;

}

.message-detail {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;

    .loading-state {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .loading-spinner {
            color: #666;
            padding: 10px;
        }
    }

    .content-container {
        display: flex;
        width: 100%;
        max-width: 1200px;
        max-height: 2000px;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;

        .image-container {
            flex: 1;
            min-width: 300px;
            min-height: 500px;
            max-height: 500px;
            position: relative;
            background-color: #f5f5f5;
            border-radius: 8px;
            overflow: hidden;

            .image-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                .main-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;

                    &.active {
                        opacity: 1;
                        z-index: 1;
                    }
                }
            }

        }

        .info-container {
            width: 100%;
            background-color: white;
            padding: 20px;
            box-sizing: border-box;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            position: relative;
            transition: transform 0.1s ease-out;
            z-index: 20;
            box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.05);

            .user-info {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 30px;

                .user-img {
                    width: 65px;
                    height: 65px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid #e0e0e0;
                }
            }

            .content-info {
                display: flex;
                flex-direction: column;
                gap: 20px;

                .content-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                }

                .content-price {
                    font-size: 24px;
                    color: #ff4d4f;
                    font-weight: bold;
                }

                .content-sold {
                    font-size: 14px;
                    color: #666;
                    padding: 8px 0;
                    border-top: 1px solid #f0f0f0;
                }
            }
        }
    }

    .original-image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
        box-sizing: border-box;

        .modal-content {
            position: relative;
            max-width: 100%;
            max-height: 100%;

            .original-img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            }
        }
    }

}

.image-indicators {
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 10;
}

.image-indicators span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
}

.image-indicators span.active {
    background-color: #fff;
    transform: scale(1.2);
}

@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .image-container {
        height: 350px;
        min-height: 350px;
        max-height: 350px;
        width: 100%;
    }
}
</style>