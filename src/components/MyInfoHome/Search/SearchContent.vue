<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import request from '@/utils/request';
import ContentCard from '@/ComponentCard/MyInfoHome/ContentCard.vue';

const route = useRoute();
const router = useRouter();
const searchContent = ref('');
const category = ref<string>('');
const page = ref<number>(1);
const pageSize = ref<number>(10);

const results = ref<{
    id: number;
    name: string;
    description: string;
    price: string;
    is_sold: boolean;
    image: null;
    likes_count: number;
    favorites_count: number;
}[]>([]);
const props = defineProps<{ content?: string }>();

const handleSearch = async () => {
    const content = searchContent.value.trim();
    if (!content) {
        alert('请输入搜索内容');
        results.value = [];
        return;
    }

    try {
        const response = await request.get('/api/product/', {
            params: {
                q: content,
                category: category.value,
                page: page.value,
                page_size: pageSize.value
            }
        });
        results.value = response.data.data.results || [];
        console.log('搜索结果：', results.value);

        // 路由同步动态参数
        router.replace({
            name: route.name,
            query: {
                name: content,
                ...(category.value && { category: category.value }),
                page: page.value,
                page_size: pageSize.value
            }
        });
    } catch (error) {
        console.error('搜索失败：', error);
        results.value = [];
    }
};

onMounted(() => {
    // 从路由获取动态参数（初始化时恢复状态）
    const keyword = route.query.name as string | undefined;
    const cat = route.query.category as string | undefined;
    const pageNum = route.query.page ? Number(route.query.page) : 1;
    const size = route.query.page_size ? Number(route.query.page_size) : 10;

    if (keyword) searchContent.value = keyword;
    if (cat) category.value = cat;
    if (!isNaN(pageNum) && pageNum > 0) page.value = pageNum;
    if (!isNaN(size) && size > 0) pageSize.value = size;

    if (keyword) {
        handleSearch();
    }
});
</script>

<template>
    <div class="search-content">
        <div class="head-div">
            <input class="input-wrapper" type="text" v-model="searchContent" :placeholder="props.content || '请输入搜索内容'"
                @keyup.enter="handleSearch">
            <button class="search-button" @click="handleSearch">搜索</button>
        </div>
        <div class="body-div">
            <div class="no-result" v-if="results.length === 0 && searchContent.trim()">
                暂无匹配的搜索结果
            </div>
            <router-link class="contact-link" v-for="contact in results" :key="contact.id"
                :to="{ path: '/Search/:name', query: { id: contact.id, name: contact.name } }">
                <ContentCard :contact="contact" />
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.search-content {

    .head-div {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        gap: 10px;

        .input-wrapper {
            padding: 12px 12px;
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

    .search-button {
        white-space: nowrap;
        padding: 8px 16px;
        border: none;
        background: #3e7bfa;
        border-radius: 15px;
        color: #fff;
        cursor: pointer;
    }
}

.body-div {
    width: 100%;
    max-width: 800px;

    .no-result {
        text-align: center;
        padding: 40px 0;
        color: #999;
    }

    .contact-link {
        margin-bottom: 12px;
    }
}
</style>
