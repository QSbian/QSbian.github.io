<script setup lang="ts">
import { computed, defineProps, onMounted, ref, } from 'vue';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    contact: {
        id: string;
        name: string;
        img: string;
        latestMessage: string;
        latestTime: string;
        unread?: number;
    };
}>();
const windowWidth = ref(window.innerWidth);
const maxDescriptionLength = computed(() => {
    if (windowWidth.value < 366) return 4;
    if (windowWidth.value < 612) return 8;
    if (windowWidth.value < 768) return 10;
    if (windowWidth.value < 920) return 12;
    return 15;
});
const formatDescription = (text: string): string => {
    if (!text) return '';
    return text.length > maxDescriptionLength.value
        ? `${text.slice(0, maxDescriptionLength.value)}...`
        : text;
};
const messageStore = useMessageStore();

const handleCardClick = () => {
    messageStore.markIfRead(props.contact.id);
};

onMounted(async () => {
})
</script>

<template>
    <section class="chat-card" @click="handleCardClick">
        <div class="contact-line">
            <div class="user-main">
                <img class="user-img" v-lazy="contact.img" :alt="contact.name">
                <div class="content-wrapper">
                    <div class="contact-name">
                        {{ contact.name }}
                    </div>
                    <div class="contact-message">
                        {{ formatDescription(contact.latestMessage || '暂无消息') }}
                    </div>
                </div>
            </div>
            <div class="extra-content">
                <div class="latest-text">
                    {{ contact.latestTime }}
                </div>
                <div class="message-unread" v-if="contact.unread && contact.unread > 0">
                    {{ contact.unread }}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.chat-card {
    .contact-line {
        width: 95%;
        display: flex;
        justify-content: space-between;
        padding: 5px;

        .user-main {
            display: flex;
            justify-content: center;
            align-items: center;

            .user-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 1px solid #2b2a2a68;
            }

            .content-wrapper {
                padding: 8px 10px;

                .contact-name {
                    color: rgba(19, 19, 19, 0.823);
                }

                .contact-message {
                    color: rgba(126, 121, 121, 0.823);
                }
            }
        }

        .extra-content {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-end;
            gap: 4px;

            .message-unread {
                background-color: #ff4d4f;
                color: white;
                font-size: 12px;
                padding: 2px 2px;
                border-radius: 50%;
                min-width: 18px;
                text-align: center;
            }
        }
    }
}
</style>