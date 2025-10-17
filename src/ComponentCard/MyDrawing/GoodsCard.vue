<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    contact: {
        id: string;
        name: string;
        title: string;
        love: number;
        view: number;
        comment: number;
        image: string;
        userimage: string;
    };
}>();

</script>

<template>
    <div class="content-card">
        <div class="image-container">
            <img v-lazy="contact.image" class="content-img" :alt="`${contact.name}的商品图片`" />
        </div>
        <div class="body-div">
            <div>{{ contact.title }}</div>
            <div class="user-content">
                <img v-lazy="contact.userimage" class="user-image" :alt="`${contact.name}的头像`" />
                <div class="user-name">{{ contact.name }}</div>
            </div>

            <div class="content-sold">
                <div class="box-content">
                    <img class="img-content" src="/爱心.png" alt="爱心" />
                    <div class="love">{{ contact.love }}</div>
                </div>
                <div class="box-content">
                    <img class="img-content" src="/评论.png" alt="评论" />
                    <div class="comment">{{ contact.comment }}</div>
                </div>
                <div class="box-content">
                    <img class="img-content" src="/浏览.png" alt="浏览" />
                    <div class="view">{{ contact.view }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-card {
    width: 100%;
    height: 100%;
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

        .user-image {
            width: clamp(50px, 6vw, 100px);
            height: clamp(50px, 6vw, 100px);
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #f0f0f0;

        }

        .user-name {
            color: #54cf83;
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
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
    }


    .content-sold {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: auto;
        padding: 4px 0;
        width: 100%;

        .box-content {
            display: flex;
            align-items: center;
            gap: clamp(2px, 0.5vw, 6px);
            flex: 1;
            justify-content: center;

            .img-content {
                width: clamp(14px, 3vw, 20px);
                height: clamp(14px, 3vw, 20px);
                object-fit: contain;
                flex-shrink: 0;
            }

            .love,
            .comment,
            .view {
                font-size: clamp(13px, 3vw, 16px);
                font-weight: 600;
                color: #999;
                white-space: nowrap;
            }
        }
    }
}

/* 针对大屏幕设备的优化 */
@media (min-width: 768px) {
    .content-sold {
        gap: 8px;
    }

    .box-content {
        gap: 6px !important;
    }

    .img-content {
        width: 18px !important;
        height: 18px !important;
    }
}
</style>
