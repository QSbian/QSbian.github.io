<script setup lang="ts">
import { defineProps } from 'vue'

// 接收路由参数
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    id: string
}>()

</script>

<template>
    <div class="message-detail">
        <h2>消息详情 - ID: {{ id }}</h2>
    </div>
</template>