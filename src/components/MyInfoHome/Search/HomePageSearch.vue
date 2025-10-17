<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const router = useRouter();
const searchContent = ref('');

const handleSearch = async () => {
    const content = searchContent.value.trim();
    if (content) {
        router.push({
            name: 'SearchTo',
            query: { name: content }
        });
    }

    else {
        alert('请输入搜索内容');
    }
};

</script>

<template>
    <div class="head-div">
        <input class="input-wrapper" type="text" v-model="searchContent" placeholder="搜索" @keyup.enter="handleSearch">
    </div>
</template>

<style scoped>
.head-div {
    top: 0;
    gap: 10px;
    z-index: 100;

    .input-wrapper {
        padding: 12px 20px;
        width: 90%;
        border: 1px solid #ddd;
        outline: none;
        border-radius: 15px;
        border-top: 1px solid #ebebeb;
        background-color: rgba(174, 172, 172, 0.137);

        &:focus {
            &::placeholder {
                opacity: 0;
                transition: opacity 0.1s ease;
            }
        }
    }
}
</style>