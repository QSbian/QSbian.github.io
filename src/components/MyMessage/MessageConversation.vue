<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import MessageCard from "@/ComponentCard/MyMessage/MessageCard.vue";
import { onMounted, ref } from "vue";
import { useMessageStore } from '@/stores/message';
const messageStore = useMessageStore();
const addSampleContacts = () => {
    const sampleContacts = [
        { id: '1', name: '张三', img: '/TT (6).jpg' },
        { id: '2', name: '李四', img: '/TT (8).jpg' },
        { id: '3', name: '王五', img: '' },
        { id: '4', name: '赵六', img: '/TT (10).jpg' }
    ];

    sampleContacts.forEach(contact => {
        messageStore.addOrUpdateContact(contact);
    });

    setTimeout(() => {
        messageStore.addMessage('1', '你好！我想约稿', false);
        messageStore.addMessage('2', '宝子在空吗？', false);
    }, 100);
};

onMounted(async () => {
    addSampleContacts();
});</script>
<template>
    <div class="message-header">
        <div class="message-no" v-if="!messageStore.hasContacts">
            暂无联系人
        </div>
        <div class="message-line" v-else>
            <router-link v-for="contact in messageStore.contacts" :key="contact.id" :to="`/Mymessage/${contact.id}`"
                class="contact-link">
                <MessageCard class="message-card" :contact="contact" />
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.message-header {
    height: 100%;

    .message-line {
        width: 95%;

        .contact-link {
            .message-card {
                padding: 1px 0;
                border-bottom: 1px solid #16161620;
            }
        }
    }
}
</style>