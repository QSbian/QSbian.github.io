<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    contact: {
        id: string;
        title: string;
        description: string;
        label: string;
        price: string;
        deadline: string;
        image: string;
        isimage: boolean;
    };
}>();

</script>

<template>
    <div class="plan-card">
        <div class="content-div">
            <div class="title-div">{{ contact.title }}</div>
            <div class="discribe-div">{{ contact.description }}</div>
            <div class="label-div">{{ contact.label }}</div>
            <div class="foot-div">
                <div class="price-div">￥{{ contact.price }}</div>
                <div class="deadline-div">{{ contact.deadline }}</div>
            </div>
        </div>
        <img v-if=contact.isimage v-lazy="contact.image" class="user-image" :alt="`加载错误`" />
    </div>
</template>

<style scoped>
.plan-card {
    width: 100%;
    padding: 8px 8px;
    display: flex;
    justify-content: space-between;
    /* #b5d7dd72 */

    .content-div {
        flex: 1;
        min-width: 0;

        .title-div {
            font-size: 20px;
            color: #000000;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .discribe-div {

            font-size: 12px;
            color: #666;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
        }

        .label-div {
            font-size: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 2px 6px;
            white-space: nowrap;
            color: #25a4e9;
            background-color: aliceblue;
            border-radius: 8px;
        }

        .foot-div {
            display: flex;
            justify-content: space-between;

            .price-div {
                color: #ff0000;
            }
        }
    }

    .user-image {
        width: 70px;
        height: 70px;
        border-radius: 10%;
        object-fit: cover;
        border: 2px solid #d2d5d5;
    }
}
</style>
