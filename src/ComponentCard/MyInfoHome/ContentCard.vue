<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

// 定义卡片接收的属性
const props = defineProps<{
    contact: {
        id: number;
        name: string;
        description: string;
        price: string;
        is_sold: boolean;
        image: null;
        likes_count: number;
        favorites_count: number;
    };
}>();

// 响应式窗口宽度
const windowWidth = ref(window.innerWidth);

const maxDescriptionLength = computed(() => {
    if (windowWidth.value < 366) return 10;
    if (windowWidth.value < 612) return 20;
    if (windowWidth.value < 768) return 10;
    if (windowWidth.value < 920) return 10;
    return 12;
});
const formatDescription = (text: string): string => {
    if (!text) return '';
    return text.length > maxDescriptionLength.value
        ? `${text.slice(0, maxDescriptionLength.value)}...`
        : text;
};
onMounted(() => {
    const handleResize = () => {
        windowWidth.value = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
});

</script>

<template>
    <div class="content-card">
        <div class="image-container">
            <img v-lazy="contact.image" class="content-img" :alt="`${contact.name}的商品图片`" />
        </div>
        <div class="body-div">
            <div class="user-content">
                <div class="user-name">{{ contact.name }}</div>
            </div>
            <div class="description">{{ formatDescription(contact.description) }}</div>
            <div class="content-sold">
                <div class="price">￥{{ contact.price }}</div>
                <div class="sold-count">已售：{{ contact.is_sold }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-card {
    color: #54cf83;
    width: 100%;
    border: 1px solid #e7e5e5;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .image-container {
        width: 100%;
        height: 160px;
        background-color: #f5f5f5;

        .content-img {
            min-height: 160px;
            width: 100%;
            height: 100%;
            object-fit: cover;

        }
    }
}


.body-div {
    padding: clamp(8px, 2vw, 12px);
    display: flex;
    flex-direction: column;
    gap: clamp(4px, 1vw, 8px);
    flex: 1;

    .user-content {
        display: flex;
        align-items: center;
        gap: clamp(4px, 1vw, 8px);

        .user-name {
            font-size: clamp(14px, 3vw, 15px);
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100% - 40px);
        }
    }

    .description {
        font-size: clamp(12px, 3vw, 14px);
        color: #666;
        line-height: 1.3;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
    }


    .content-sold {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;

        .price {
            font-size: clamp(13px, 3vw, 16px);
            font-weight: 600;
            color: #ff6b35;
        }

        .sold-count {
            font-size: clamp(11px, 2.5vw, 13px);
            color: #999;
        }
    }
}
</style>
