<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    contact: {
        id: string;
        name: string;
        appriciation: string;
        state: string;
        image: string[];
        userimage: string;
        havePrice: boolean;
    };
}>();
</script>
<template>
    <div class="main-div">
        <div class="user-info">
            <div class="avatar-container">
                <img class="user-img" v-lazy="contact.userimage" alt="用户头像" />
            </div>
            <div class="concrete-appreciate">
                <div class="up-lable">
                    <div class="user-name">{{ contact.name }}</div>
                    <div class="state-lable">{{ contact.state }}</div>
                </div>
                <div class="bottom-lable">
                    <div class="good-appreciation"> ★ {{ contact.appriciation }}</div>
                </div>
            </div>
        </div>
        <div class="images-container">
            <div class="image-item" v-for="(img, index) in contact.image" :key="`${contact.id}-${index}`">
                <img class="show-img" :src="img" :alt="`相关图片 ${index + 1}`" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.main-div {
    background: linear-gradient(to right, #ffffff, #ffffff);
    padding: 20px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    border: 0 2px 15px rgba(0, 0, 0, 0.963);

    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 4px;
        border-bottom: 1px solid #198fdd;

        .avatar-container {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;

            .user-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                /* 保持比例并填充容器 */
            }
        }

        .concrete-appreciate {
            flex: 1;

            .up-lable {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 4px;

                .user-name {
                    font-weight: 500;
                    color: #100d0d;
                }

                .state-lable {
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    background-color: #f5f5f5;
                    color: rgb(3, 162, 255);
                    border: 1px solid #e5e7eb;
                    border-color: rgb(3, 162, 255);
                }
            }

            .bottom-lable {
                color: #666;
                font-size: 14px;

                .good-appreciation {
                    color: rgb(255, 179, 0);
                }
            }


        }
    }

    .images-container {
        display: flex;
        gap: 10px;
        margin-top: 12px;
        padding-bottom: 8px;

        .image-item {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
            background-color: #f5f5f5;

            .show-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.2s ease;
            }
        }
    }
}



@media (max-width: 480px) {
    .avatar-container {
        width: 50px;
        height: 50px;
    }

    .image-item {
        width: 100px;
        height: 100px;
    }
}
</style>
